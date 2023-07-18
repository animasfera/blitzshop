export const styles = {
  global: {
    html: { minHeight: "-webkit-fill-available" },
    body: {
      fontSize: "16px",
      lineHeight: "24px",
      minHeight: "-webkit-fill-available",
    },
    "#__next": {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      minHeight: "-webkit-fill-available",
      height: "100%",
      paddingTop: ["64px", "74px", 0],
    },
    "main-container": {
      flexGrow: 1,
    },
    "#landing": {
      marginTop: "-74px",
      h1: {
        fontSize: "48px",
        fontWeight: "bold",
        lineHeight: "1.2 !important",
      },
      h2: {
        fontWeight: 400,
        fontSize: "32px",
        lineHeight: "38px",
      },
    },
    a: { textDecoration: "underline" },
    b: {},
    h1: {
      marginBottom: "var(--chakra-space-7)",
      fontFamily: "var(--chakra-fonts-heading)",
      fontWeight: "var(--chakra-fontWeights-bold)",
      fontSize: "var(--chakra-fontSizes-3xl)",
      lineHeight: "1.33",
    },
    h2: {
      fontSize: "21px",
      marginBottom: "var(--chakra-space-6)",
      fontFamily: "var(--chakra-fonts-heading)",
      fontWeight: "var(--chakra-fontWeights-bold)",
    },
    h3: {
      fontSize: "18px",
      marginTop: "15px",
      marginBottom: "20px",
    },
    p: {
      marginBottom: "15px",
    },
  },
}
