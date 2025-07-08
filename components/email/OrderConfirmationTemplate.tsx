import { formatCurrency } from "@/lib/utils/price-utils";
import { OrderConfirmationProps } from "@/types/emails/order-confirmation";
import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const OrderConfirmationTemplate = ({
  name,
  order_ref,
  total_price,
  total_quantity,
  items,
}: OrderConfirmationProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Order Confirmation from Nexus Store</Preview>
      <Container style={container}>
        <Section>
          <Row>
            <Column>
              <Img
                src={`${baseUrl}/logo.png`}
                width="42"
                height="42"
                alt="Nexus Store Logo"
              />
            </Column>
            <Column align="right" style={tableCell}>
              <Text style={heading}>Thank you for your order!</Text>
            </Column>
          </Row>
        </Section>

        <Section>
          <Text style={introText}>
            Hello {name},
            <br />
            Thank you for shopping with <strong>Nexus Store</strong>.
            <br />
            Your order <strong>{order_ref}</strong> has been received and is
            being processed.
          </Text>
        </Section>

        <Section>
          <Text style={productSummaryText}>
            <strong>Total Items:</strong> {total_quantity}
            <br />
            <strong>Total Price:</strong> {formatCurrency(total_price)}
          </Text>
        </Section>

        <Hr />

        <Section>
          {items.map((item, index) => (
            <Row key={index} align="left">
              <Column align="left" style={{ width: "64px" }}>
                <Img
                  src={item.product_image}
                  width="64"
                  height="64"
                  alt={item.product_name}
                  style={productIcon}
                />
              </Column>
              <Column align="left" style={{ paddingLeft: "22px" }}>
                <Text style={productTitle}>{item.product_name}</Text>
                <Text style={productDescription}>
                  Quantity: {item.quantity}
                </Text>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "4px 0",
                  }}
                >
                  <div
                    style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      backgroundColor: item.color_hex,
                      marginRight: "8px",
                      border: "1px solid #ccc",
                    }}
                  ></div>
                </div>
                <Text style={productDescription}>
                  Unit Price: {formatCurrency(item.unit_price)}
                </Text>
                <Text style={productDescription}>
                  Total: {formatCurrency(item.total_price)}
                </Text>
              </Column>
            </Row>
          ))}
        </Section>

        <Hr style={{ margin: "32px 0" }} />

        <Text style={footerTextCenter}>
          {/* If you have any questions, feel free to reply to this email or visit our
          <Link href="https://www.nexus-store.com/support" style={footerLink}> Support Center</Link>. */}
        </Text>

        <Text style={footerTextCenter}>
          Thank you again for shopping with us!
        </Text>
        <Text style={footerCopyright}>
          &copy; {new Date().getFullYear()} Nexus Store. All rights reserved.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default OrderConfirmationTemplate;

const main = {
  fontFamily: "Helvetica, Arial, sans-serif",
  backgroundColor: "#ffffff",
  padding: "20px 0",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "660px",
  maxWidth: "100%",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#333333",
};

const tableCell = { display: "table-cell" };

const introText = {
  fontSize: "16px",
  color: "#333333",
  lineHeight: "1.5",
  marginBottom: "24px",
};

const productSummaryText = {
  fontSize: "14px",
  color: "#111111",
  marginBottom: "16px",
};

const productIcon = {
  borderRadius: "8px",
  border: "1px solid #eaeaea",
};

const productTitle = {
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 4px 0",
};

const productDescription = {
  fontSize: "13px",
  color: "#555555",
  margin: "0 0 4px 0",
};

const footerTextCenter = {
  fontSize: "12px",
  color: "#999999",
  margin: "20px 0",
  textAlign: "center" as const,
};

// const footerLink = {
//   color: "#0070f3",
//   textDecoration: "none",
// };

const footerCopyright = {
  textAlign: "center" as const,
  fontSize: "12px",
  color: "#999999",
  marginTop: "20px",
};
