import mailgun from "mailgun-js"
import { MailgunMessageData } from "mailgun.js/types/Messages"
import previewEmail from "preview-email"
import { renderToStaticMarkup } from "react-dom/server"
import { Box, Image, Table, Tbody, Tr, Td, Heading, Link } from "@chakra-ui/react"
import i18next from "i18next"
import i18n from "src/core/i18n"
import { GlobalRef } from "../index"
import { LocaleType } from "../../../types"
import { Routes } from "@blitzjs/next"
// import EmailSettingsPage from "../../pages/settings/notifications"

export function EmailTemplate(props: { html: string; footer: string }) {
  return (
    <body>
      <Table
        style={{
          borderCollapse: "collapse",
          borderSpacing: "0px",
          width: "100%",
          fontFamily: "'Helvetica neue', helvetica, arial, sans-serif",
        }}
      >
        <Tbody>
          <Tr>
            <Td align={"center"} style={{ background: "#EEE" }}>
              <Table
                style={{
                  borderCollapse: "collapse",
                  borderSpacing: "0px",
                  width: "600px",
                  background: "#FFF",
                  fontFamily: '"Helvetica neue", Helvetica, arial, sans-serif',
                }}
              >
                <Tbody>
                  <Tr>
                    <Td
                      align={"center"}
                      style={{
                        paddingBottom: "25px",
                        paddingTop: "20px",
                      }}
                    >
                      <Image
                        src={process.env.SITE_URL + "/logo-green.jpg"}
                        style={{ width: "80px", height: "80px" }}
                        alt={"Leela.Game logo"}
                      />
                      <Heading size={"sm"} style={{ marginTop: 0 }}>
                        Leela.Game
                      </Heading>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td align={"center"}>
                      <Box
                        style={{
                          fontSize: "18px",
                          fontFamily: "Helvetica",
                          maxWidth: "500px",
                          textAlign: "left",
                          paddingBottom: "100px",
                        }}
                      >
                        <div dangerouslySetInnerHTML={{ __html: props.html }}></div>
                      </Box>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        backgroundColor: "#f5f5f5",
                        paddingBottom: "50px",
                        paddingTop: "50px",
                      }}
                    >
                      <span style={{ display: "inline-block" }}>
                        <Image
                          src={process.env.SITE_URL + "/img/telegram.png"}
                          style={{
                            width: "32px",
                            verticalAlign: "middle",
                            paddingRight: "5px",
                          }}
                        />
                        <Link href={"https://t.me/OmkaraBot"}>@OmkaraBot</Link>
                      </span>
                      <span style={{ display: "inline-block", paddingLeft: "25px" }}>
                        <Image
                          src={process.env.SITE_URL + "/img/youtube.png"}
                          style={{
                            width: "32px",
                            verticalAlign: "middle",
                            paddingRight: "5px",
                          }}
                        />
                        <Link href={"https://www.youtube.com/@LeelaGame.Omkara"}>YouTube</Link>
                      </span>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td
                      align={"center"}
                      verticalAlign={"middle"}
                      style={{
                        fontSize: "11px",
                        color: "#999",
                        backgroundColor: "#f5f5f5",
                        paddingBottom: "50px",
                        paddingTop: "0px",
                      }}
                    >
                      <div dangerouslySetInnerHTML={{ __html: props.footer }}></div>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </body>
  )
}

let mailgunRef = new GlobalRef<any>(`omkarashop.mailgun`)
if (!mailgunRef.value) {
  mailgunRef.value = mailgun({
    apiKey: process.env.MAILGUN_API_KEY || "",
    domain: process.env.MAILGUN_DOMAIN || "",
    host: process.env.MAILGUN_HOST,
  })
}
const mailgunInstance = mailgunRef.value

export const mailer = {
  translateNew: async (
    mailerName: string,
    data: (i18n: typeof i18next) => MailgunMessageData,
    lang = "en"
  ) => {
    await i18n.changeLanguage(lang)
    await i18n.loadNamespaces(["mails"])

    return data(i18n)
  },
  translate: async (mailerName, params, lang = "en") => {
    await i18n.changeLanguage(lang)
    await i18n.loadNamespaces(["mails"])

    return {
      subject: i18n.t(`mails:${mailerName}.subject`) as string,
      html: i18n.t(`mails:${mailerName}.html`, params) as string,
    }
  },
  send: async (
    data: MailgunMessageData,
    locale: LocaleType,
    callback?: (error: any, body: string) => void
  ) => {
    if (typeof data.to === "object") {
      const uniqueEmails = data.to.filter((value, index, self) => {
        return self.indexOf(value) === index
      })
      data.to = uniqueEmails
    }

    if (!data.from) {
      data.from = `${process.env.SITE_NAME} <${process.env.SITE_EMAIL}>`
    }
    await i18n.changeLanguage(locale)
    await i18n.loadNamespaces(["mails"])
    // const unsubscribeUrl = process.env.SITE_URL + Routes.EmailSettingsPage().pathname
    const footer = i18n.t("mails:components.footer", {})
    data.html = renderToStaticMarkup(
      <EmailTemplate html={data.html! || data.text!} footer={footer} />
    )
    delete data.text

    if (process.env.SHOP_ENV === "production") {
      mailgunInstance.messages().send(data, callback)
    } else {
      await previewEmail(data)
    }
  },
  mg: mailgunInstance,
}
