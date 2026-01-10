import { Box, Container, Link, IconButton } from '@mui/material';
import { Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

export function TopRibbon() {
  return (
    <Box
      sx={{
        bgcolor: '#1e3a8a',
        color: 'white',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, lg: 4 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 40,
            fontSize: '0.875rem',
          }}
        >
          {/* Left side - Contact Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Link
              href="tel:+1234567890"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                color: 'white',
                textDecoration: 'none',
                '&:hover': {
                  color: '#bfdbfe',
                },
                transition: 'color 0.2s',
              }}
            >
              <Phone className="w-3.5 h-3.5" />
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                +1 (234) 567-890
              </Box>
            </Link>
            <Box
              component="span"
              sx={{
                color: '#60a5fa',
                display: { xs: 'none', sm: 'inline' },
              }}
            >
              |
            </Box>
            <Link
              href="mailto:info@amaravathi.com"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                color: 'white',
                textDecoration: 'none',
                '&:hover': {
                  color: '#bfdbfe',
                },
                transition: 'color 0.2s',
              }}
            >
              <Mail className="w-3.5 h-3.5" />
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                info@amaravathi.com
              </Box>
            </Link>
          </Box>

          {/* Right side - Social Media */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <IconButton
              component="a"
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              sx={{
                color: 'white',
                p: 0.5,
                '&:hover': {
                  color: '#bfdbfe',
                },
                transition: 'color 0.2s',
              }}
            >
              <Facebook className="w-4 h-4" />
            </IconButton>
            <IconButton
              component="a"
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              sx={{
                color: 'white',
                p: 0.5,
                '&:hover': {
                  color: '#bfdbfe',
                },
                transition: 'color 0.2s',
              }}
            >
              <Twitter className="w-4 h-4" />
            </IconButton>
            <IconButton
              component="a"
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              sx={{
                color: 'white',
                p: 0.5,
                '&:hover': {
                  color: '#bfdbfe',
                },
                transition: 'color 0.2s',
              }}
            >
              <Linkedin className="w-4 h-4" />
            </IconButton>
            <IconButton
              component="a"
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              sx={{
                color: 'white',
                p: 0.5,
                '&:hover': {
                  color: '#bfdbfe',
                },
                transition: 'color 0.2s',
              }}
            >
              <Instagram className="w-4 h-4" />
            </IconButton>
            <IconButton
              component="a"
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              sx={{
                color: 'white',
                p: 0.5,
                '&:hover': {
                  color: '#bfdbfe',
                },
                transition: 'color 0.2s',
              }}
            >
              <Youtube className="w-4 h-4" />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
