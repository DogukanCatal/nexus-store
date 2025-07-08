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

type OrderStatusChangeTemplateProps = {
  orderRef: string;
  newStatus: string;
};

export const OrderStatusChangeTemplate = ({
  orderRef,
  newStatus,
}: OrderStatusChangeTemplateProps) => (
  <Html>
    <Head />
    <Preview>Your order {orderRef} status has been updated</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoSection}>
          <Img
            src={`${baseUrl}/logo.png`}
            width="64"
            height="64"
            alt="Nexus Store Logo"
            style={logoStyle}
          />
        </Section>

        <Section style={contentSection}>
          <Text style={heading}>Order Update</Text>
          <Text style={statusText}>
            Your order <strong>{orderRef}</strong> status has been updated to:
          </Text>
          <Text style={statusBox}>{newStatus}</Text>
          {/* <Text style={footerText}>
            You can view more details in your Nexus Store account.
          </Text> */}
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

export default OrderStatusChangeTemplate;

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

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "16px",
};

const statusText = {
  fontSize: "16px",
  marginBottom: "16px",
};

const statusBox = {
  backgroundColor: "#f5f5f5",
  color: "#333",
  display: "inline-block",
  padding: "10px 20px",
  fontSize: "18px",
  fontWeight: "600",
  borderRadius: "6px",
  marginBottom: "24px",
};

// const footerText = {
//   fontSize: "14px",
//   color: "#666",
//   marginTop: "20px",
// };

const footerSection = {
  textAlign: "center" as const,
  marginTop: "40px",
};

const footerTextSmall = {
  fontSize: "12px",
  color: "#999",
};
