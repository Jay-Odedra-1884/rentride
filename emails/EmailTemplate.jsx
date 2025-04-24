import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";


//Dummy data for understand . if any team member wants to update the Template then follow this formate.

const userData = {
  recipientType: "user",
  data: {
    userName: "Bhargav",
    ownerName: "Jay", 
    ownerEmail: "jay@gmail.com", 
    vehicle: {
      name: "BMW M4",
      brandName: "BMW",
      type: "Car",
      gearType: "AUTOMATIC",
      airConditioning: true,
    },
    booking: {
      startTime: "2025-05-01T10:00:00Z",
      endTime: "2025-05-03T18:00:00Z",
      pickupLocation: "jail",
      dropoffLocation: "gec",
    },
  },
};

const ownerData = {
  recipientType: "owner",
  data: {
    ownerName: "Jay",
    userName: "Bhargav",
    customerEmail: "bhargav@gmail.com",
    vehicle: {
      name: "BMW M4",
      brandName: "BMW",
      type: "Car",
      gearType: "AUTOMATIC",
      airConditioning: true,
    },
    booking: {
      startTime: "2025-05-01T10:00:00Z",
      endTime: "2025-05-03T18:00:00Z",
      pickupLocation: "jail",
      dropoffLocation: "gec",
    },
  },
};


export default function EmailTemplate({
  recipientType = "",
  data = {},
}) {
  const {
    userName = "",
    ownerEmail="",
    vehicle = {},
    booking = {},
    ownerName = "",
    customerEmail = "",
  } = data;

  const commonVehicleDetails = (
    <>
      <Text style={styles.text}>
        Vehicle: <b>{vehicle.name}</b>
      </Text>
      <Text style={styles.text}>Brand: {vehicle.brandName}</Text>
      <Text style={styles.text}>Type: {vehicle.type}</Text>
      <Text style={styles.text}>Gear: {vehicle.gearType}</Text>
      <Text style={styles.text}>
        Air Conditioning: {vehicle.airConditioning ? "Yes" : "No"}
      </Text>
    </>
  );

  const commonBookingDetails = (
    <>
      <Text style={styles.text}>
        Start: {new Date(booking.startTime).toLocaleString()}
      </Text>
      <Text style={styles.text}>
        End: {new Date(booking.endTime).toLocaleString()}
      </Text>
      <Text style={styles.text}>Pickup: {booking.pickupLocation}</Text>
      <Text style={styles.text}>Drop-off: {booking.dropoffLocation}</Text>
    </>
  );

  return (
    <Html>
      <Head />
      <Preview>
        {recipientType === "user"
          ? "Your Vehicle Booking Confirmation"
          : "Your Vehicle Has Been Booked"}
      </Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {recipientType === "user" ? (
            <>
              <Heading style={styles.title}>Booking Confirmation</Heading>
              <Text style={styles.text}>Hello {userName},</Text>
              <Text style={styles.text}>
                Thank you for booking with RentRide! Here are your booking
                details:
              </Text>

              <Section style={styles.section}>
                <Heading style={styles.heading}>Vehicle Details</Heading>
                {commonVehicleDetails}
              </Section>

              {ownerName && ownerEmail && (
                <Section style={styles.section}>
                  <Heading style={styles.heading}>Vehicle Owner Info</Heading>
                  <Text style={styles.text}>Owner: {ownerName}</Text>
                  <Text style={styles.text}>Email: {ownerEmail}</Text>
                </Section>
              )}

              <Section style={styles.section}>
                <Heading style={styles.heading}>Booking Information</Heading>
                {commonBookingDetails}
              </Section>

              <Text style={styles.footer}>
                Need help? Contact us anytime. Enjoy your ride!
              </Text>
            </>
          ) : (
            <>
              <Heading style={styles.title}>Vehicle Booking Alert</Heading>
              <Text style={styles.text}>Hello {ownerName},</Text>
              <Text style={styles.text}>
                Your vehicle <b>{vehicle.name}</b> has been booked. Here are the
                details:
              </Text>

              <Section style={styles.section}>
                <Heading style={styles.heading}>Customer Info</Heading>
                <Text style={styles.text}>Name: {userName}</Text>
                <Text style={styles.text}>Email: {customerEmail}</Text>
              </Section>

              <Section style={styles.section}>
                <Heading style={styles.heading}>Booking Details</Heading>
                {commonVehicleDetails}
                {commonBookingDetails}
              </Section>

              <Text style={styles.footer}>
                You can manage your bookings from your RentRide dashboard.
              </Text>
            </>
          )}
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: "#f6f9fc",
    fontFamily: "-apple-system, sans-serif",
  },
  container: {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  title: {
    color: "#1f2937",
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    margin: "0 0 20px",
  },
  heading: {
    color: "#1f2937",
    fontSize: "20px",
    fontWeight: "600",
    margin: "0 0 16px",
  },
  text: {
    color: "#4b5563",
    fontSize: "16px",
    margin: "0 0 12px",
  },
  section: {
    marginTop: "24px",
    padding: "20px",
    backgroundColor: "#f9fafb",
    borderRadius: "5px",
    border: "1px solid #e5e7eb",
  },
  footer: {
    color: "#6b7280",
    fontSize: "14px",
    textAlign: "center",
    marginTop: "32px",
    paddingTop: "16px",
    borderTop: "1px solid #e5e7eb",
  },
};

