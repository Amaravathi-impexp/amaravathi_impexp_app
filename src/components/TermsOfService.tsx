/**
 * Terms of Service Component
 * Legal terms and conditions for using Amaravathi Imports & Exports services
 */

import { Container, Box, Typography, Divider, Paper } from '@mui/material';
import { FileText, Calendar, Shield, AlertCircle } from 'lucide-react';

export default function TermsOfService() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f9fafb', py: 6 }}>
      <Container maxWidth="md">
        <Paper elevation={1} sx={{ p: { xs: 3, md: 5 }, borderRadius: 2 }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <FileText style={{ width: 48, height: 48, color: '#1A3D32' }} />
            </Box>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 700, color: '#1a1a1a' }}>
              Terms of Service
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Amaravathi Imports & Exports
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 2 }}>
              <Calendar style={{ width: 16, height: 16, color: '#6b7280' }} />
              <Typography variant="body2" color="text.secondary">
                Last Updated: January 2, 2026
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Introduction */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              1. Introduction
            </Typography>
            <Typography variant="body1" paragraph>
              Welcome to Amaravathi Imports & Exports ("Company", "we", "our", or "us"). These Terms of Service ("Terms") govern your access to and use of our shipping, logistics, and freight forwarding services, including our website, mobile applications, and related services (collectively, the "Services").
            </Typography>
            <Typography variant="body1" paragraph>
              By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Services.
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Account Registration */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              2. Account Registration
            </Typography>
            <Typography variant="body1" paragraph>
              To access certain features of our Services, you must register for an account. You agree to:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Typography component="li" variant="body1" paragraph>
                Provide accurate, current, and complete information during registration
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Maintain and promptly update your account information
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Maintain the security of your password and account credentials
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Accept responsibility for all activities that occur under your account
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Notify us immediately of any unauthorized use of your account
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Services Description */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              3. Services Description
            </Typography>
            <Typography variant="body1" paragraph>
              Amaravathi Imports & Exports provides international shipping, freight forwarding, customs clearance, and logistics management services. Our Services include but are not limited to:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Typography component="li" variant="body1" paragraph>
                Ocean freight and air freight services
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Customs brokerage and clearance
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Warehousing and distribution
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Shipment tracking and documentation
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Supply chain consulting
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* User Responsibilities */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              4. User Responsibilities
            </Typography>
            <Typography variant="body1" paragraph>
              You are responsible for:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Typography component="li" variant="body1" paragraph>
                Ensuring all shipment information is accurate and complete
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Complying with all applicable laws, regulations, and customs requirements
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Properly packaging and labeling all shipments
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Providing necessary documentation for customs clearance
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Paying all fees, duties, and taxes associated with your shipments
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Prohibited Items */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
              <AlertCircle style={{ width: 20, height: 20, color: '#dc2626' }} />
              5. Prohibited Items
            </Typography>
            <Typography variant="body1" paragraph>
              You may not ship any items that are:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Typography component="li" variant="body1" paragraph>
                Illegal, hazardous, or dangerous materials
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Weapons, explosives, or ammunition
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Narcotics or controlled substances
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Counterfeit goods or items that infringe intellectual property rights
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Live animals (except where specifically permitted)
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Items prohibited by international shipping regulations
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Pricing and Payment */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              6. Pricing and Payment
            </Typography>
            <Typography variant="body1" paragraph>
              All prices are quoted in the agreed currency and are subject to change. Payment terms include:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Typography component="li" variant="body1" paragraph>
                Invoices must be paid within the specified payment period
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Late payments may incur interest charges
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Additional charges may apply for storage, detention, or demurrage
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Currency conversion fees may apply for international transactions
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Liability Limitations */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Shield style={{ width: 20, height: 20, color: '#1A3D32' }} />
              7. Limitation of Liability
            </Typography>
            <Typography variant="body1" paragraph>
              Our liability for loss or damage to shipments is limited to:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Typography component="li" variant="body1" paragraph>
                The declared value of the shipment, or
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                The limits set forth in applicable international conventions (e.g., Warsaw Convention, Hague-Visby Rules)
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Additional insurance coverage is available and recommended for high-value shipments
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              We are not liable for delays caused by customs inspections, weather conditions, acts of God, or other events beyond our reasonable control.
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Intellectual Property */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              8. Intellectual Property
            </Typography>
            <Typography variant="body1" paragraph>
              All content, trademarks, logos, and intellectual property on our platform are owned by or licensed to Amaravathi Imports & Exports. You may not use, copy, or distribute any content without our express written permission.
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Termination */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              9. Termination
            </Typography>
            <Typography variant="body1" paragraph>
              We reserve the right to suspend or terminate your account at any time for:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Typography component="li" variant="body1" paragraph>
                Violation of these Terms of Service
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Non-payment of invoices
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Fraudulent or illegal activity
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Any conduct that harms our business or reputation
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Governing Law */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              10. Governing Law
            </Typography>
            <Typography variant="body1" paragraph>
              These Terms are governed by and construed in accordance with the laws of the jurisdiction in which Amaravathi Imports & Exports is registered. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in that jurisdiction.
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Changes to Terms */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              11. Changes to Terms
            </Typography>
            <Typography variant="body1" paragraph>
              We reserve the right to modify these Terms at any time. We will notify users of significant changes via email or through our platform. Your continued use of our Services after such changes constitutes acceptance of the modified Terms.
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Contact Information */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              12. Contact Information
            </Typography>
            <Typography variant="body1" paragraph>
              If you have any questions about these Terms of Service, please contact us:
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography variant="body1" paragraph>
                <strong>Amaravathi Imports & Exports</strong>
              </Typography>
              <Typography variant="body1" paragraph>
                Email: legal@amaravathi.com
              </Typography>
              <Typography variant="body1" paragraph>
                Phone: +1-800-AMARAVATHI
              </Typography>
              <Typography variant="body1" paragraph>
                Address: [Company Registered Address]
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Footer Notice */}
          <Box sx={{ 
            bgcolor: '#f3f4f6', 
            p: 3, 
            borderRadius: 2,
            border: '1px solid #e5e7eb'
          }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              <strong>Note:</strong> By using Amaravathi Imports & Exports services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. These Terms constitute a legally binding agreement between you and Amaravathi Imports & Exports.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}