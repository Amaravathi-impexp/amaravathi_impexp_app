/**
 * Privacy Policy Component
 * Data protection and privacy policy for TIMPEX.club (Telugu Import Export Club)
 */

import { Container, Box, Typography, Divider, Paper, Chip } from '@mui/material';
import { Shield, Lock, Eye, Database, Users, Globe, AlertTriangle, Mail } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f9fafb', py: 6 }}>
      <Container maxWidth="md">
        <Paper elevation={1} sx={{ p: { xs: 3, md: 5 }, borderRadius: 2 }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Shield style={{ width: 48, height: 48, color: '#16a34a' }} />
            </Box>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 700, color: '#1a1a1a' }}>
              Privacy Policy
            </Typography>
            <Typography variant="body1" color="text.secondary">
              TIMPEX.club (Telugu Import Export Club)
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Last Updated: January 2, 2026
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2, flexWrap: 'wrap' }}>
              <Chip label="GDPR Compliant" size="small" color="success" />
              <Chip label="CCPA Compliant" size="small" color="success" />
              <Chip label="ISO 27001" size="small" color="primary" />
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Introduction */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              1. Introduction
            </Typography>
            <Typography variant="body1" paragraph>
              At TIMPEX.club (Telugu Import Export Club) ("we", "our", or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our shipping and logistics services.
            </Typography>
            <Typography variant="body1" paragraph>
              This policy applies to all users of our website, mobile applications, and related services (collectively, the "Services"). By using our Services, you consent to the data practices described in this policy.
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Information We Collect */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Database style={{ width: 20, height: 20, color: '#1A3D32' }} />
              2. Information We Collect
            </Typography>
            
            <Typography variant="h6" sx={{ mb: 1, mt: 2, fontWeight: 600 }}>
              2.1 Personal Information
            </Typography>
            <Typography variant="body1" paragraph>
              We collect personal information that you provide directly to us, including:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Typography component="li" variant="body1" paragraph>
                Name, email address, phone number, and contact details
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Company name and business information
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Billing and payment information
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Shipping addresses (origin and destination)
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Account credentials and authentication data
              </Typography>
            </Box>

            <Typography variant="h6" sx={{ mb: 1, mt: 2, fontWeight: 600 }}>
              2.2 Shipment Information
            </Typography>
            <Typography variant="body1" paragraph>
              We collect information related to your shipments, including:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Typography component="li" variant="body1" paragraph>
                Cargo details, weight, and dimensions
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Customs declarations and documentation
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Tracking and delivery information
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Product types and HS codes
              </Typography>
            </Box>

            <Typography variant="h6" sx={{ mb: 1, mt: 2, fontWeight: 600 }}>
              2.3 Automatically Collected Information
            </Typography>
            <Typography variant="body1" paragraph>
              When you use our Services, we automatically collect:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Typography component="li" variant="body1" paragraph>
                IP address, browser type, and device information
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Usage data and analytics (pages viewed, features used)
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Cookies and similar tracking technologies
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Location data (with your permission)
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* How We Use Your Information */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Eye style={{ width: 20, height: 20, color: '#3D7A68' }} />
              3. How We Use Your Information
            </Typography>
            <Typography variant="body1" paragraph>
              We use the collected information for the following purposes:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Typography component="li" variant="body1" paragraph>
                <strong>Service Delivery:</strong> Process and manage your shipments, provide tracking information, and deliver our logistics services
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                <strong>Account Management:</strong> Create and maintain your account, authenticate users, and provide customer support
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                <strong>Billing and Payments:</strong> Process payments, generate invoices, and manage financial transactions
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                <strong>Communications:</strong> Send service updates, shipment notifications, and marketing communications (with your consent)
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                <strong>Compliance:</strong> Meet legal and regulatory obligations, including customs and export regulations
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                <strong>Analytics and Improvements:</strong> Analyze usage patterns to improve our Services and develop new features
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                <strong>Security:</strong> Protect against fraud, unauthorized access, and security threats
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Information Sharing */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Users style={{ width: 20, height: 20, color: '#f97316' }} />
              4. Information Sharing and Disclosure
            </Typography>
            <Typography variant="body1" paragraph>
              We may share your information with:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Typography component="li" variant="body1" paragraph>
                <strong>Service Providers:</strong> Third-party carriers, customs brokers, warehousing partners, and payment processors who help us deliver our Services
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                <strong>Regulatory Authorities:</strong> Government agencies, customs authorities, and law enforcement when required by law
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                <strong>Business Partners:</strong> Shipping lines, airlines, and logistics partners necessary for shipment execution
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                <strong>With Your Consent:</strong> Any other parties when you provide explicit consent
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              We do not sell your personal information to third parties for their marketing purposes.
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Data Security */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Lock style={{ width: 20, height: 20, color: '#16a34a' }} />
              5. Data Security
            </Typography>
            <Typography variant="body1" paragraph>
              We implement industry-standard security measures to protect your information, including:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Typography component="li" variant="body1" paragraph>
                Encryption of data in transit and at rest (SSL/TLS)
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Secure authentication and access controls
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Regular security audits and penetration testing
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Employee training on data protection practices
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Incident response and breach notification procedures
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security but continuously work to enhance our security measures.
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Data Retention */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              6. Data Retention
            </Typography>
            <Typography variant="body1" paragraph>
              We retain your personal information for as long as necessary to:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Typography component="li" variant="body1" paragraph>
                Provide our Services and maintain your account
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Comply with legal, tax, and regulatory obligations (typically 7 years for financial records)
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Resolve disputes and enforce our agreements
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Maintain business records and analytics
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              When data is no longer needed, we securely delete or anonymize it in accordance with our data retention policies.
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Your Rights */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              7. Your Privacy Rights
            </Typography>
            <Typography variant="body1" paragraph>
              Depending on your jurisdiction, you may have the following rights:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Typography component="li" variant="body1" paragraph>
                <strong>Access:</strong> Request a copy of the personal information we hold about you
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                <strong>Correction:</strong> Request correction of inaccurate or incomplete information
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                <strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                <strong>Portability:</strong> Request a copy of your data in a structured, machine-readable format
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                <strong>Objection:</strong> Object to processing of your data for certain purposes
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                <strong>Restriction:</strong> Request restriction of processing under certain circumstances
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                <strong>Withdraw Consent:</strong> Withdraw consent for marketing communications or optional data processing
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              To exercise these rights, please contact us at privacy@timpex.club.
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Cookies */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              8. Cookies and Tracking Technologies
            </Typography>
            <Typography variant="body1" paragraph>
              We use cookies and similar technologies to enhance your experience. These include:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Typography component="li" variant="body1" paragraph>
                <strong>Essential Cookies:</strong> Required for basic functionality and security
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                <strong>Analytics Cookies:</strong> Help us understand how users interact with our Services
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                <strong>Functional Cookies:</strong> Remember your preferences and settings
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                <strong>Marketing Cookies:</strong> Used for targeted advertising (with your consent)
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              You can manage cookie preferences through your browser settings. Note that disabling certain cookies may affect functionality.
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* International Transfers */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Globe style={{ width: 20, height: 20, color: '#1A3D32' }} />
              9. International Data Transfers
            </Typography>
            <Typography variant="body1" paragraph>
              As a global logistics provider, your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws.
            </Typography>
            <Typography variant="body1" paragraph>
              When transferring data internationally, we ensure appropriate safeguards are in place, such as:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Typography component="li" variant="body1" paragraph>
                Standard Contractual Clauses (SCCs) approved by the European Commission
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Adequacy decisions for countries with equivalent data protection laws
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Binding Corporate Rules (BCRs) where applicable
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Children's Privacy */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
              <AlertTriangle style={{ width: 20, height: 20, color: '#eab308' }} />
              10. Children's Privacy
            </Typography>
            <Typography variant="body1" paragraph>
              Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately and we will delete such information.
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Third-Party Links */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              11. Third-Party Links
            </Typography>
            <Typography variant="body1" paragraph>
              Our Services may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any personal information.
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Changes to Policy */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              12. Changes to This Privacy Policy
            </Typography>
            <Typography variant="body1" paragraph>
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of significant changes by:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Typography component="li" variant="body1" paragraph>
                Posting the updated policy on our website
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Sending email notifications for material changes
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Updating the "Last Updated" date at the top of this policy
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              Your continued use of our Services after changes indicates acceptance of the updated policy.
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Contact Information */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Mail style={{ width: 20, height: 20, color: '#1A3D32' }} />
              13. Contact Us
            </Typography>
            <Typography variant="body1" paragraph>
              If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact:
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography variant="body1" paragraph>
                <strong>Data Protection Officer</strong>
              </Typography>
              <Typography variant="body1" paragraph>
                Email: privacy@timpex.club
              </Typography>
              <Typography variant="body1" paragraph>
                Phone: +1-800-TIMPEX
              </Typography>
              <Typography variant="body1" paragraph>
                Address: [Company Registered Address]
              </Typography>
            </Box>
            <Typography variant="body1" paragraph sx={{ mt: 2 }}>
              <strong>EU Representative:</strong> [EU Representative Contact - if applicable]
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Supervisory Authority:</strong> You have the right to lodge a complaint with your local data protection authority if you believe your rights have been violated.
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Footer Notice */}
          <Box sx={{ 
            bgcolor: '#ecfdf5', 
            p: 3, 
            borderRadius: 2,
            border: '1px solid #a7f3d0'
          }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              <strong>Your Privacy Matters:</strong> At TIMPEX.club, we are committed to transparency and protecting your personal information. We process data lawfully, fairly, and with appropriate security measures. If you have any concerns about how we handle your data, please don't hesitate to contact our Data Protection Officer.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}