import previewEmail from "preview-email"
import { renderToStaticMarkup } from "react-dom/server"
import { Box, Image, Table, Tbody, Tr, Td, Heading, Link } from "@chakra-ui/react"
import i18next from "i18next"
import mailgun from "mailgun-js"
import { MailgunMessageData } from "node_modules/mailgun.js/Types/Messages"
import i18n from "src/core/i18n"
import { GlobalRef } from "../index"

export function EmailTemplate(props: { html: string }) {
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
                    <Td align={"center"} style={{ paddingBottom: "20px", paddingTop: "25px" }}>
                      <Image
                        src={process.env.SITE_URL + "/logo.png"}
                        style={{ width: "150px", height: "150px" }}
                        alt={"Leela.Game logo"}
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td align={"center"} paddingBottom={"20px"}>
                      <Heading size={"md"}>
                        <Link href={"https://leela.game"} textDecoration={"none"}>
                          Leela.Game
                        </Link>
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
                </Tbody>
              </Table>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </body>
  )
}

let mailgunRef = new GlobalRef<any>(`leela.mailgun`)
if (!mailgunRef.value) {
  mailgunRef.value = mailgun({
    apiKey: process.env.MAILGUN_API_KEY ?? "",
    domain: process.env.MAILGUN_DOMAIN ?? "",
    host: process.env.MAILGUN_HOST ?? "",
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
  send: async (data: MailgunMessageData, callback?: (error: any, body: string) => void) => {
    if (typeof data.to === "object") {
      const uniqueEmails = data.to.filter((value, index, self) => {
        return self.indexOf(value) === index
      })
      data.to = uniqueEmails
    }

    if (!data.from) {
      data.from = `${process.env.SITE_NAME} <${process.env.SITE_EMAIL}>`
    }

    data.html = renderToStaticMarkup(<EmailTemplate html={data.html! || data.text!} />)
    delete data.text

    if (process.env.LEELA_ENV === "production") {
      mailgunInstance.messages().send(data, callback)
    } else {
      await previewEmail(data)
    }
  },
  mg: mailgunInstance,
}
