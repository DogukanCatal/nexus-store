import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

type MailVerificationTemplateProps = {
  name: string;
  surname: string;
  code: string;
};

export const EmailVerificationTemplate = ({
  name,
  surname,
  code,
}: MailVerificationTemplateProps) => (
  <Html>
    <Head />
    <Preview>
      Email Verification Code for {name} {surname}
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoSection}>
          <Img
            src={`${baseUrl}/static/logo.png`}
            width="64"
            height="64"
            alt="Logo"
            style={logoStyle}
          />
        </Section>

        <Section style={contentSection}>
          <Text style={greetingText}>
            Hi {name} {surname},
          </Text>
          <Text style={instructionText}>Here is your verification code:</Text>
          <Text style={codeBox}>{code}</Text>
          <Text style={footerText}>
            If you did not request this, please ignore this email.
          </Text>
        </Section>

        <Section style={footerSection}>
          <Text style={footerTextSmall}>
            © {new Date().getFullYear()} Nexus Store. All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default EmailVerificationTemplate;

// Styles
const main = {
  fontFamily: "Helvetica, Arial, sans-serif",
  backgroundColor: "#ffffff",
  padding: "40px 0",
};

const container = {
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
  padding: "0 24px",
};

const logoSection = {
  textAlign: "center" as const,
  marginBottom: "32px",
};

const logoStyle = {
  borderRadius: "8px",
};

const contentSection = {
  textAlign: "center" as const,
};

const greetingText = {
  fontSize: "20px",
  marginBottom: "12px",
};

const instructionText = {
  fontSize: "16px",
  marginBottom: "24px",
};

const codeBox = {
  backgroundColor: "#262626",
  color: "#ffffff",
  display: "inline-block",
  padding: "12px 24px",
  fontSize: "24px",
  fontWeight: "bold" as const,
  borderRadius: "8px",
  letterSpacing: "2px",
  marginBottom: "32px",
};

const footerText = {
  fontSize: "14px",
  color: "#CCCCCC",
  marginTop: "24px",
};

const footerSection = {
  textAlign: "center" as const,
  marginTop: "40px",
};

const footerTextSmall = {
  fontSize: "12px",
  color: "#888888",
};
