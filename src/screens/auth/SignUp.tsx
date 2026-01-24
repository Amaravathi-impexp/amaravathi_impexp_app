import { Check, X } from 'lucide-react';
import { useState } from 'react';
import {
  TextField,
  Button,
  Alert,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Autocomplete,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Navigation } from '../../components/layout/Navigation';
import { Footer } from '../../components/layout/Footer';
import { useSignUpMutation } from '../../store/api/authApi';
import { useAppDispatch } from '../../store/hooks';
import { setCredentials } from '../../store/slices/authSlice';

// Country codes data
const countryCodes = [
  { code: '+1', label: '🇺🇸 +1 United States', country: 'United States' },
  { code: '+1', label: '🇨🇦 +1 Canada', country: 'Canada' },
  { code: '+7', label: '🇷🇺 +7 Russia', country: 'Russia' },
  { code: '+7', label: '🇰🇿 +7 Kazakhstan', country: 'Kazakhstan' },
  { code: '+20', label: '🇪🇬 +20 Egypt', country: 'Egypt' },
  { code: '+27', label: '🇿🇦 +27 South Africa', country: 'South Africa' },
  { code: '+30', label: '🇬🇷 +30 Greece', country: 'Greece' },
  { code: '+31', label: '🇳🇱 +31 Netherlands', country: 'Netherlands' },
  { code: '+32', label: '🇧🇪 +32 Belgium', country: 'Belgium' },
  { code: '+33', label: '🇫🇷 +33 France', country: 'France' },
  { code: '+34', label: '🇪🇸 +34 Spain', country: 'Spain' },
  { code: '+36', label: '🇭🇺 +36 Hungary', country: 'Hungary' },
  { code: '+39', label: '🇮🇹 +39 Italy', country: 'Italy' },
  { code: '+40', label: '🇷🇴 +40 Romania', country: 'Romania' },
  { code: '+41', label: '🇨🇭 +41 Switzerland', country: 'Switzerland' },
  { code: '+43', label: '🇦🇹 +43 Austria', country: 'Austria' },
  { code: '+44', label: '🇬🇧 +44 United Kingdom', country: 'United Kingdom' },
  { code: '+45', label: '🇩🇰 +45 Denmark', country: 'Denmark' },
  { code: '+46', label: '🇸🇪 +46 Sweden', country: 'Sweden' },
  { code: '+47', label: '🇳🇴 +47 Norway', country: 'Norway' },
  { code: '+48', label: '🇵🇱 +48 Poland', country: 'Poland' },
  { code: '+49', label: '🇩🇪 +49 Germany', country: 'Germany' },
  { code: '+51', label: '🇵🇪 +51 Peru', country: 'Peru' },
  { code: '+52', label: '🇲🇽 +52 Mexico', country: 'Mexico' },
  { code: '+53', label: '🇨🇺 +53 Cuba', country: 'Cuba' },
  { code: '+54', label: '🇦🇷 +54 Argentina', country: 'Argentina' },
  { code: '+55', label: '🇧🇷 +55 Brazil', country: 'Brazil' },
  { code: '+56', label: '🇨🇱 +56 Chile', country: 'Chile' },
  { code: '+57', label: '🇨🇴 +57 Colombia', country: 'Colombia' },
  { code: '+58', label: '🇻🇪 +58 Venezuela', country: 'Venezuela' },
  { code: '+60', label: '🇲🇾 +60 Malaysia', country: 'Malaysia' },
  { code: '+61', label: '🇦🇺 +61 Australia', country: 'Australia' },
  { code: '+62', label: '🇮🇩 +62 Indonesia', country: 'Indonesia' },
  { code: '+63', label: '🇵🇭 +63 Philippines', country: 'Philippines' },
  { code: '+64', label: '🇳🇿 +64 New Zealand', country: 'New Zealand' },
  { code: '+65', label: '🇸🇬 +65 Singapore', country: 'Singapore' },
  { code: '+66', label: '🇹🇭 +66 Thailand', country: 'Thailand' },
  { code: '+81', label: '🇯🇵 +81 Japan', country: 'Japan' },
  { code: '+82', label: '🇰🇷 +82 South Korea', country: 'South Korea' },
  { code: '+84', label: '🇻🇳 +84 Vietnam', country: 'Vietnam' },
  { code: '+86', label: '🇨🇳 +86 China', country: 'China' },
  { code: '+90', label: '🇹🇷 +90 Turkey', country: 'Turkey' },
  { code: '+91', label: '🇮🇳 +91 India', country: 'India' },
  { code: '+92', label: '🇵🇰 +92 Pakistan', country: 'Pakistan' },
  { code: '+93', label: '🇦🇫 +93 Afghanistan', country: 'Afghanistan' },
  { code: '+94', label: '🇱🇰 +94 Sri Lanka', country: 'Sri Lanka' },
  { code: '+95', label: '🇲🇲 +95 Myanmar', country: 'Myanmar' },
  { code: '+98', label: '🇮🇷 +98 Iran', country: 'Iran' },
  { code: '+211', label: '🇸🇸 +211 South Sudan', country: 'South Sudan' },
  { code: '+212', label: '🇲🇦 +212 Morocco', country: 'Morocco' },
  { code: '+213', label: '🇩🇿 +213 Algeria', country: 'Algeria' },
  { code: '+216', label: '🇹🇳 +216 Tunisia', country: 'Tunisia' },
  { code: '+218', label: '🇱🇾 +218 Libya', country: 'Libya' },
  { code: '+220', label: '🇬🇲 +220 Gambia', country: 'Gambia' },
  { code: '+221', label: '🇸🇳 +221 Senegal', country: 'Senegal' },
  { code: '+222', label: '🇲🇷 +222 Mauritania', country: 'Mauritania' },
  { code: '+223', label: '🇲🇱 +223 Mali', country: 'Mali' },
  { code: '+224', label: '🇬🇳 +224 Guinea', country: 'Guinea' },
  { code: '+225', label: '🇨🇮 +225 Ivory Coast', country: 'Ivory Coast' },
  { code: '+226', label: '🇧🇫 +226 Burkina Faso', country: 'Burkina Faso' },
  { code: '+227', label: '🇳🇪 +227 Niger', country: 'Niger' },
  { code: '+228', label: '🇹🇬 +228 Togo', country: 'Togo' },
  { code: '+229', label: '🇧🇯 +229 Benin', country: 'Benin' },
  { code: '+230', label: '🇲🇺 +230 Mauritius', country: 'Mauritius' },
  { code: '+231', label: '🇱🇷 +231 Liberia', country: 'Liberia' },
  { code: '+233', label: '🇬🇭 +233 Ghana', country: 'Ghana' },
  { code: '+234', label: '🇳🇬 +234 Nigeria', country: 'Nigeria' },
  { code: '+235', label: '🇹🇩 +235 Chad', country: 'Chad' },
  { code: '+236', label: '🇨🇫 +236 Central African Rep', country: 'Central African Rep' },
  { code: '+237', label: '🇨🇲 +237 Cameroon', country: 'Cameroon' },
  { code: '+238', label: '🇨🇻 +238 Cape Verde', country: 'Cape Verde' },
  { code: '+241', label: '🇬🇦 +241 Gabon', country: 'Gabon' },
  { code: '+242', label: '🇨🇬 +242 Congo (Rep)', country: 'Congo (Rep)' },
  { code: '+243', label: '🇨🇩 +243 Congo (DRC)', country: 'Congo (DRC)' },
  { code: '+244', label: '🇦🇴 +244 Angola', country: 'Angola' },
  { code: '+249', label: '🇸🇩 +249 Sudan', country: 'Sudan' },
  { code: '+250', label: '🇷🇼 +250 Rwanda', country: 'Rwanda' },
  { code: '+251', label: '🇪🇹 +251 Ethiopia', country: 'Ethiopia' },
  { code: '+252', label: '🇸🇴 +252 Somalia', country: 'Somalia' },
  { code: '+253', label: '🇩🇯 +253 Djibouti', country: 'Djibouti' },
  { code: '+254', label: '🇰🇪 +254 Kenya', country: 'Kenya' },
  { code: '+255', label: '🇹🇿 +255 Tanzania', country: 'Tanzania' },
  { code: '+256', label: '🇺🇬 +256 Uganda', country: 'Uganda' },
  { code: '+257', label: '🇧🇮 +257 Burundi', country: 'Burundi' },
  { code: '+258', label: '🇲🇿 +258 Mozambique', country: 'Mozambique' },
  { code: '+260', label: '🇿🇲 +260 Zambia', country: 'Zambia' },
  { code: '+261', label: '🇲🇬 +261 Madagascar', country: 'Madagascar' },
  { code: '+263', label: '🇿🇼 +263 Zimbabwe', country: 'Zimbabwe' },
  { code: '+264', label: '🇳🇦 +264 Namibia', country: 'Namibia' },
  { code: '+265', label: '🇲🇼 +265 Malawi', country: 'Malawi' },
  { code: '+267', label: '🇧🇼 +267 Botswana', country: 'Botswana' },
  { code: '+351', label: '🇵🇹 +351 Portugal', country: 'Portugal' },
  { code: '+352', label: '🇱🇺 +352 Luxembourg', country: 'Luxembourg' },
  { code: '+353', label: '🇮🇪 +353 Ireland', country: 'Ireland' },
  { code: '+354', label: '🇮🇸 +354 Iceland', country: 'Iceland' },
  { code: '+355', label: '🇦🇱 +355 Albania', country: 'Albania' },
  { code: '+356', label: '🇲🇹 +356 Malta', country: 'Malta' },
  { code: '+357', label: '🇨🇾 +357 Cyprus', country: 'Cyprus' },
  { code: '+358', label: '🇫🇮 +358 Finland', country: 'Finland' },
  { code: '+359', label: '🇧🇬 +359 Bulgaria', country: 'Bulgaria' },
  { code: '+370', label: '🇱🇹 +370 Lithuania', country: 'Lithuania' },
  { code: '+371', label: '🇱🇻 +371 Latvia', country: 'Latvia' },
  { code: '+372', label: '🇪🇪 +372 Estonia', country: 'Estonia' },
  { code: '+373', label: '🇲🇩 +373 Moldova', country: 'Moldova' },
  { code: '+374', label: '🇦🇲 +374 Armenia', country: 'Armenia' },
  { code: '+375', label: '🇧🇾 +375 Belarus', country: 'Belarus' },
  { code: '+376', label: '🇦🇩 +376 Andorra', country: 'Andorra' },
  { code: '+377', label: '🇲🇨 +377 Monaco', country: 'Monaco' },
  { code: '+380', label: '🇺🇦 +380 Ukraine', country: 'Ukraine' },
  { code: '+381', label: '🇷🇸 +381 Serbia', country: 'Serbia' },
  { code: '+382', label: '🇲🇪 +382 Montenegro', country: 'Montenegro' },
  { code: '+385', label: '🇭🇷 +385 Croatia', country: 'Croatia' },
  { code: '+386', label: '🇸🇮 +386 Slovenia', country: 'Slovenia' },
  { code: '+387', label: '🇧🇦 +387 Bosnia', country: 'Bosnia' },
  { code: '+389', label: '🇲🇰 +389 North Macedonia', country: 'North Macedonia' },
  { code: '+420', label: '🇨🇿 +420 Czech Republic', country: 'Czech Republic' },
  { code: '+421', label: '🇸🇰 +421 Slovakia', country: 'Slovakia' },
  { code: '+423', label: '🇱🇮 +423 Liechtenstein', country: 'Liechtenstein' },
  { code: '+501', label: '🇧🇿 +501 Belize', country: 'Belize' },
  { code: '+503', label: '🇸🇻 +503 El Salvador', country: 'El Salvador' },
  { code: '+504', label: '🇭🇳 +504 Honduras', country: 'Honduras' },
  { code: '+505', label: '🇳🇮 +505 Nicaragua', country: 'Nicaragua' },
  { code: '+506', label: '🇨🇷 +506 Costa Rica', country: 'Costa Rica' },
  { code: '+507', label: '🇵🇦 +507 Panama', country: 'Panama' },
  { code: '+509', label: '🇭🇹 +509 Haiti', country: 'Haiti' },
  { code: '+591', label: '🇧🇴 +591 Bolivia', country: 'Bolivia' },
  { code: '+592', label: '🇬🇾 +592 Guyana', country: 'Guyana' },
  { code: '+593', label: '🇪🇨 +593 Ecuador', country: 'Ecuador' },
  { code: '+595', label: '🇵🇾 +595 Paraguay', country: 'Paraguay' },
  { code: '+597', label: '🇸🇷 +597 Suriname', country: 'Suriname' },
  { code: '+598', label: '🇺🇾 +598 Uruguay', country: 'Uruguay' },
  { code: '+673', label: '🇧🇳 +673 Brunei', country: 'Brunei' },
  { code: '+675', label: '🇵🇬 +675 Papua New Guinea', country: 'Papua New Guinea' },
  { code: '+676', label: '🇹🇴 +676 Tonga', country: 'Tonga' },
  { code: '+678', label: '🇻🇺 +678 Vanuatu', country: 'Vanuatu' },
  { code: '+850', label: '🇰🇵 +850 North Korea', country: 'North Korea' },
  { code: '+852', label: '🇭🇰 +852 Hong Kong', country: 'Hong Kong' },
  { code: '+853', label: '🇲🇴 +853 Macau', country: 'Macau' },
  { code: '+855', label: '🇰🇭 +855 Cambodia', country: 'Cambodia' },
  { code: '+856', label: '🇱🇦 +856 Laos', country: 'Laos' },
  { code: '+880', label: '🇧🇩 +880 Bangladesh', country: 'Bangladesh' },
  { code: '+886', label: '🇹🇼 +886 Taiwan', country: 'Taiwan' },
  { code: '+960', label: '🇲🇻 +960 Maldives', country: 'Maldives' },
  { code: '+961', label: '🇱🇧 +961 Lebanon', country: 'Lebanon' },
  { code: '+962', label: '🇯🇴 +962 Jordan', country: 'Jordan' },
  { code: '+963', label: '🇸🇾 +963 Syria', country: 'Syria' },
  { code: '+964', label: '🇮🇶 +964 Iraq', country: 'Iraq' },
  { code: '+965', label: '🇰🇼 +965 Kuwait', country: 'Kuwait' },
  { code: '+966', label: '🇸🇦 +966 Saudi Arabia', country: 'Saudi Arabia' },
  { code: '+967', label: '🇾🇪 +967 Yemen', country: 'Yemen' },
  { code: '+968', label: '🇴🇲 +968 Oman', country: 'Oman' },
  { code: '+970', label: '🇵🇸 +970 Palestine', country: 'Palestine' },
  { code: '+971', label: '🇦🇪 +971 UAE', country: 'UAE' },
  { code: '+972', label: '🇮🇱 +972 Israel', country: 'Israel' },
  { code: '+973', label: '🇧🇭 +973 Bahrain', country: 'Bahrain' },
  { code: '+974', label: '🇶🇦 +974 Qatar', country: 'Qatar' },
  { code: '+975', label: '🇧🇹 +975 Bhutan', country: 'Bhutan' },
  { code: '+976', label: '🇲🇳 +976 Mongolia', country: 'Mongolia' },
  { code: '+977', label: '🇳🇵 +977 Nepal', country: 'Nepal' },
  { code: '+992', label: '🇹🇯 +992 Tajikistan', country: 'Tajikistan' },
  { code: '+993', label: '🇹🇲 +993 Turkmenistan', country: 'Turkmenistan' },
  { code: '+994', label: '🇦🇿 +994 Azerbaijan', country: 'Azerbaijan' },
  { code: '+995', label: '🇬🇪 +995 Georgia', country: 'Georgia' },
  { code: '+996', label: '🇰🇬 +996 Kyrgyzstan', country: 'Kyrgyzstan' },
  { code: '+998', label: '🇺🇿 +998 Uzbekistan', country: 'Uzbekistan' },
];

// Countries data
const countries = [
  { code: 'AF', label: '🇦🇫 Afghanistan' },
  { code: 'AL', label: '🇦🇱 Albania' },
  { code: 'DZ', label: '🇩🇿 Algeria' },
  { code: 'AD', label: '🇦🇩 Andorra' },
  { code: 'AO', label: '🇦🇴 Angola' },
  { code: 'AR', label: '🇦🇷 Argentina' },
  { code: 'AM', label: '🇦🇲 Armenia' },
  { code: 'AU', label: '🇦🇺 Australia' },
  { code: 'AT', label: '🇦🇹 Austria' },
  { code: 'AZ', label: '🇦🇿 Azerbaijan' },
  { code: 'BH', label: '🇧🇭 Bahrain' },
  { code: 'BD', label: '🇧🇩 Bangladesh' },
  { code: 'BY', label: '🇧🇾 Belarus' },
  { code: 'BE', label: '🇧🇪 Belgium' },
  { code: 'BZ', label: '🇧🇿 Belize' },
  { code: 'BJ', label: '🇧🇯 Benin' },
  { code: 'BT', label: '🇧🇹 Bhutan' },
  { code: 'BO', label: '🇧🇴 Bolivia' },
  { code: 'BA', label: '🇧🇦 Bosnia and Herzegovina' },
  { code: 'BW', label: '🇧🇼 Botswana' },
  { code: 'BR', label: '🇧🇷 Brazil' },
  { code: 'BN', label: '🇧🇳 Brunei' },
  { code: 'BG', label: '🇧🇬 Bulgaria' },
  { code: 'BF', label: '🇧🇫 Burkina Faso' },
  { code: 'BI', label: '🇧🇮 Burundi' },
  { code: 'KH', label: '🇰🇭 Cambodia' },
  { code: 'CM', label: '🇨🇲 Cameroon' },
  { code: 'CA', label: '🇨🇦 Canada' },
  { code: 'CV', label: '🇨🇻 Cape Verde' },
  { code: 'CF', label: '🇨🇫 Central African Republic' },
  { code: 'TD', label: '🇹🇩 Chad' },
  { code: 'CL', label: '🇨🇱 Chile' },
  { code: 'CN', label: '🇨🇳 China' },
  { code: 'CO', label: '🇨🇴 Colombia' },
  { code: 'CD', label: '🇨🇩 Congo (DRC)' },
  { code: 'CG', label: '🇨🇬 Congo (Republic)' },
  { code: 'CR', label: '🇨🇷 Costa Rica' },
  { code: 'HR', label: '🇭🇷 Croatia' },
  { code: 'CU', label: '🇨🇺 Cuba' },
  { code: 'CY', label: '🇨🇾 Cyprus' },
  { code: 'CZ', label: '🇨🇿 Czech Republic' },
  { code: 'DK', label: '🇩🇰 Denmark' },
  { code: 'DJ', label: '🇩🇯 Djibouti' },
  { code: 'EC', label: '🇪🇨 Ecuador' },
  { code: 'EG', label: '🇪🇬 Egypt' },
  { code: 'SV', label: '🇸🇻 El Salvador' },
  { code: 'EE', label: '🇪🇪 Estonia' },
  { code: 'ET', label: '🇪🇹 Ethiopia' },
  { code: 'FI', label: '🇫🇮 Finland' },
  { code: 'FR', label: '🇫🇷 France' },
  { code: 'GA', label: '🇬🇦 Gabon' },
  { code: 'GM', label: '🇬🇲 Gambia' },
  { code: 'GE', label: '🇬🇪 Georgia' },
  { code: 'DE', label: '🇩🇪 Germany' },
  { code: 'GH', label: '🇬🇭 Ghana' },
  { code: 'GR', label: '🇬🇷 Greece' },
  { code: 'GT', label: '🇬🇹 Guatemala' },
  { code: 'GN', label: '🇬🇳 Guinea' },
  { code: 'GY', label: '🇬🇾 Guyana' },
  { code: 'HT', label: '🇭🇹 Haiti' },
  { code: 'HN', label: '🇭🇳 Honduras' },
  { code: 'HK', label: '🇭🇰 Hong Kong' },
  { code: 'HU', label: '🇭🇺 Hungary' },
  { code: 'IS', label: '🇮🇸 Iceland' },
  { code: 'IN', label: '🇮🇳 India' },
  { code: 'ID', label: '🇮🇩 Indonesia' },
  { code: 'IR', label: '🇮🇷 Iran' },
  { code: 'IQ', label: '🇮🇶 Iraq' },
  { code: 'IE', label: '🇮🇪 Ireland' },
  { code: 'IL', label: '🇮🇱 Israel' },
  { code: 'IT', label: '🇮🇹 Italy' },
  { code: 'CI', label: '🇨🇮 Ivory Coast' },
  { code: 'JP', label: '🇯🇵 Japan' },
  { code: 'JO', label: '🇯🇴 Jordan' },
  { code: 'KZ', label: '🇰🇿 Kazakhstan' },
  { code: 'KE', label: '🇰🇪 Kenya' },
  { code: 'KW', label: '🇰🇼 Kuwait' },
  { code: 'KG', label: '🇰🇬 Kyrgyzstan' },
  { code: 'LA', label: '🇱🇦 Laos' },
  { code: 'LV', label: '🇱🇻 Latvia' },
  { code: 'LB', label: '🇱🇧 Lebanon' },
  { code: 'LR', label: '🇱🇷 Liberia' },
  { code: 'LY', label: '🇱🇾 Libya' },
  { code: 'LI', label: '🇱🇮 Liechtenstein' },
  { code: 'LT', label: '🇱🇹 Lithuania' },
  { code: 'LU', label: '🇱🇺 Luxembourg' },
  { code: 'MO', label: '🇲🇴 Macau' },
  { code: 'MG', label: '🇲🇬 Madagascar' },
  { code: 'MW', label: '🇲🇼 Malawi' },
  { code: 'MY', label: '🇲🇾 Malaysia' },
  { code: 'MV', label: '🇲🇻 Maldives' },
  { code: 'ML', label: '🇲🇱 Mali' },
  { code: 'MT', label: '🇲🇹 Malta' },
  { code: 'MR', label: '🇲🇷 Mauritania' },
  { code: 'MU', label: '🇲🇺 Mauritius' },
  { code: 'MX', label: '🇲🇽 Mexico' },
  { code: 'MD', label: '🇲🇩 Moldova' },
  { code: 'MC', label: '🇲🇨 Monaco' },
  { code: 'MN', label: '🇲🇳 Mongolia' },
  { code: 'ME', label: '🇲🇪 Montenegro' },
  { code: 'MA', label: '🇲🇦 Morocco' },
  { code: 'MZ', label: '🇲🇿 Mozambique' },
  { code: 'MM', label: '🇲🇲 Myanmar' },
  { code: 'NA', label: '🇳🇦 Namibia' },
  { code: 'NP', label: '🇳🇵 Nepal' },
  { code: 'NL', label: '🇳🇱 Netherlands' },
  { code: 'NZ', label: '🇳🇿 New Zealand' },
  { code: 'NI', label: '🇳🇮 Nicaragua' },
  { code: 'NE', label: '🇳🇪 Niger' },
  { code: 'NG', label: '🇳🇬 Nigeria' },
  { code: 'KP', label: '🇰🇵 North Korea' },
  { code: 'MK', label: '🇲🇰 North Macedonia' },
  { code: 'NO', label: '🇳🇴 Norway' },
  { code: 'OM', label: '🇴🇲 Oman' },
  { code: 'PK', label: '🇵🇰 Pakistan' },
  { code: 'PS', label: '🇵🇸 Palestine' },
  { code: 'PA', label: '🇵🇦 Panama' },
  { code: 'PG', label: '🇵🇬 Papua New Guinea' },
  { code: 'PY', label: '🇵🇾 Paraguay' },
  { code: 'PE', label: '🇵🇪 Peru' },
  { code: 'PH', label: '🇵🇭 Philippines' },
  { code: 'PL', label: '🇵🇱 Poland' },
  { code: 'PT', label: '🇵🇹 Portugal' },
  { code: 'QA', label: '🇶🇦 Qatar' },
  { code: 'RO', label: '🇷🇴 Romania' },
  { code: 'RU', label: '🇷🇺 Russia' },
  { code: 'RW', label: '🇷🇼 Rwanda' },
  { code: 'SA', label: '🇸🇦 Saudi Arabia' },
  { code: 'SN', label: '🇸🇳 Senegal' },
  { code: 'RS', label: '🇷🇸 Serbia' },
  { code: 'SG', label: '🇸🇬 Singapore' },
  { code: 'SK', label: '🇸🇰 Slovakia' },
  { code: '+994', label: '🇦🇿 +994 Azerbaijan', country: 'Azerbaijan' },
  { code: 'SI', label: '🇸🇮 Slovenia' },
  { code: 'SO', label: '🇸🇴 Somalia' },
  { code: 'ZA', label: '🇿🇦 South Africa' },
  { code: 'KR', label: '🇰🇷 South Korea' },
  { code: 'SS', label: '🇸🇸 South Sudan' },
  { code: 'ES', label: '🇪🇸 Spain' },
  { code: 'LK', label: '🇱🇰 Sri Lanka' },
  { code: 'SD', label: '🇸🇩 Sudan' },
  { code: 'SR', label: '🇸🇷 Suriname' },
  { code: 'SE', label: '🇸🇪 Sweden' },
  { code: 'CH', label: '🇨🇭 Switzerland' },
  { code: 'SY', label: '🇸🇾 Syria' },
  { code: 'TW', label: '🇹🇼 Taiwan' },
  { code: 'TJ', label: '🇹🇯 Tajikistan' },
  { code: 'TZ', label: '🇹🇿 Tanzania' },
  { code: 'TH', label: '🇹🇭 Thailand' },
  { code: 'TG', label: '🇹🇬 Togo' },
  { code: 'TO', label: '🇹🇴 Tonga' },
  { code: 'TN', label: '🇹🇳 Tunisia' },
  { code: 'TR', label: '🇹🇷 Turkey' },
  { code: 'TM', label: '🇹🇲 Turkmenistan' },
  { code: 'UG', label: '🇺🇬 Uganda' },
  { code: 'UA', label: '🇺🇦 Ukraine' },
  { code: 'AE', label: '🇦🇪 United Arab Emirates' },
  { code: 'GB', label: '🇬🇧 United Kingdom' },
  { code: 'US', label: '🇺🇸 United States' },
  { code: 'UY', label: '🇺🇾 Uruguay' },
  { code: 'UZ', label: '🇺🇿 Uzbekistan' },
  { code: 'VU', label: '🇻🇺 Vanuatu' },
  { code: 'VE', label: '🇻🇪 Venezuela' },
  { code: 'VN', label: '🇻🇳 Vietnam' },
  { code: 'YE', label: '🇾🇪 Yemen' },
  { code: 'ZM', label: '🇿🇲 Zambia' },
  { code: 'ZW', label: '🇿🇼 Zimbabwe' },
];

interface SignUpProps {
  onClose: () => void;
  onSwitchToSignIn: () => void;
  onSignUpSuccess: () => void;
  onAboutClick?: () => void;
  onContactClick?: () => void;
  onScrollToSection?: (sectionId: string) => void;
}

export function SignUp({ onClose, onSwitchToSignIn, onSignUpSuccess, onAboutClick, onContactClick, onScrollToSection }: SignUpProps) {
  const dispatch = useAppDispatch();
  const [signUp, { isLoading }] = useSignUpMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '',  // Empty by default, user must select
    phone: '',
    country: '',
    city: '',
    language: '',
    profileType: '',
    primaryInterest: '',
    tradingExperience: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToComms: false,
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [hasPasswordBeenFocused, setHasPasswordBeenFocused] = useState(false);
  
  // Password validation states
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  
  // Check if all password requirements are met
  const allPasswordRequirementsMet = 
    passwordValidation.minLength &&
    passwordValidation.hasUppercase &&
    passwordValidation.hasLowercase &&
    passwordValidation.hasNumber &&
    passwordValidation.hasSpecialChar;

  // Check if all required fields are filled and consent is given
  const isFormValid = 
    formData.fullName.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.phone.trim() !== '' &&
    formData.country !== '' &&
    formData.city.trim() !== '' &&
    formData.password !== '' &&
    formData.confirmPassword !== '' &&
    formData.agreeToTerms &&
    allPasswordRequirementsMet;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }
    
    try {
      // Build payload with only required fields + optional fields that user filled in
      const payload: any = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };

      // Add optional fields only if user provided them
      if (formData.countryCode) payload.countryCode = formData.countryCode;
      if (formData.country) payload.residenceCountry = formData.country;
      if (formData.city) payload.city = formData.city;
      if (formData.language) payload.preferredLanguage = formData.language;
      if (formData.profileType) payload.occupation = formData.profileType;
      if (formData.primaryInterest) payload.interest = formData.primaryInterest;
      if (formData.tradingExperience) payload.previousTradingExposure = formData.tradingExperience;
      if (formData.agreeToTerms) payload.termsAccepted = formData.agreeToTerms;
      if (formData.agreeToComms) payload.communicationConsent = formData.agreeToComms;

      const response = await signUp(payload).unwrap();
      
      // Show success message from API
      setSuccessMessage(response.message || 'Account created successfully! Please check your email for verification.');
      
      // Optionally redirect to sign in after a delay
      setTimeout(() => {
        onSwitchToSignIn();
      }, 2000);
    } catch (err: any) {
      // Handle API errors - no console.log of error details
      const errorMessage = err?.data?.message || err?.message || 'Sign-up failed. Please try again.';
      setError(errorMessage);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%&*_\-.]/.test(password);
    
    setPasswordValidation({
      minLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecialChar,
    });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
      <Navigation 
        onHomeClick={onClose}
        onAboutClick={onAboutClick}
        onContactClick={onContactClick}
        onScrollToSection={onScrollToSection}
        currentView="signup"
        hideAuthButton={true}
      />

      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 12, mt: 6 }}>
        <Box sx={{ width: '100%', maxWidth: 700, px: 3 }}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 5, 
              borderRadius: 3,
              bgcolor: 'white',
              border: '1px solid',
              borderColor: 'grey.200',
            }}
          >
            {/* Enroll Header */}
            <Box sx={{ mb: 3 }}>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 600, margin: 0, marginBottom: '0.5rem', color: '#1a1a1a' }}>
                Create Your TIMPEX.club Account
              </h2>
              <p style={{ fontSize: '1rem', margin: 0, color: '#6b7280' }}>
                Register to access the Telugu Import Export Club platform.
              </p>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {/* Section A: Basic Details */}
              <Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1a1a1a' }}>
                  A. Basic Details
                </Typography>
                
                {/* Full Name */}
                <TextField
                  id="fullName"
                  name="fullName"
                  type="text"
                  label="Full Name"
                  placeholder="Enter your full name"
                  required
                  fullWidth
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2.5 }}
                />

                {/* Email */}
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="your.email@example.com"
                  autoComplete="email"
                  required
                  fullWidth
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2.5 }}
                />

                {/* Mobile / WhatsApp Number */}
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: 2.5 }}>
                  <Autocomplete
                    options={countryCodes}
                    getOptionLabel={(option) => option.label}
                    value={countryCodes.find(c => c.code === formData.countryCode) || null}
                    onChange={(_, newValue) => {
                      if (newValue) {
                        handleChange('countryCode', newValue.code);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Code"
                        required
                      />
                    )}
                    sx={{ minWidth: 180 }}
                    isOptionEqualToValue={(option, value) => option.code === value.code}
                  />
                  <TextField
                    id="phone"
                    name="phone"
                    type="tel"
                    label="Mobile / WhatsApp Number"
                    placeholder="234 567 8901"
                    required
                    fullWidth
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    variant="outlined"
                  />
                </Box>

                {/* Country and City */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 2.5 }}>
                  <Autocomplete
                    options={countries}
                    getOptionLabel={(option) => option.label}
                    value={countries.find(c => c.code === formData.country) || null}
                    onChange={(_, newValue) => {
                      handleChange('country', newValue?.code || '');
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Country of Residence"
                        required
                      />
                    )}
                    fullWidth
                    isOptionEqualToValue={(option, value) => option.code === value.code}
                  />
                  <TextField
                    id="city"
                    name="city"
                    label="City"
                    placeholder="Enter your city"
                    required
                    fullWidth
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    variant="outlined"
                  />
                </Box>

                {/* Preferred Language */}
                <FormControl fullWidth>
                  <InputLabel>Preferred Language</InputLabel>
                  <Select
                    value={formData.language}
                    onChange={(e) => handleChange('language', e.target.value)}
                    label="Preferred Language"
                  >
                    <MenuItem value="telugu">Telugu</MenuItem>
                    <MenuItem value="english">English</MenuItem>
                    <MenuItem value="both">Both</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Section B: Profile Information */}
              <Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1a1a1a' }}>
                  B. Profile Information
                </Typography>
                
                {/* You are a: */}
                <FormControl fullWidth sx={{ mb: 2.5 }}>
                  <InputLabel>You are a:</InputLabel>
                  <Select
                    value={formData.profileType}
                    onChange={(e) => handleChange('profileType', e.target.value)}
                    label="You are a:"
                  >
                    <MenuItem value="working_professional">Working Professional</MenuItem>
                    <MenuItem value="homemaker">Homemaker</MenuItem>
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="business_owner">Business Owner</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>

                {/* Primary Interest */}
                <FormControl fullWidth sx={{ mb: 2.5 }}>
                  <InputLabel>Primary Interest:</InputLabel>
                  <Select
                    value={formData.primaryInterest}
                    onChange={(e) => handleChange('primaryInterest', e.target.value)}
                    label="Primary Interest:"
                  >
                    <MenuItem value="import">Import</MenuItem>
                    <MenuItem value="export">Export</MenuItem>
                    <MenuItem value="both">Both</MenuItem>
                    <MenuItem value="exploring">Exploring / Not sure</MenuItem>
                  </Select>
                </FormControl>

                {/* Previous exposure to trading */}
                <FormControl fullWidth>
                  <InputLabel>Previous exposure to trading:</InputLabel>
                  <Select
                    value={formData.tradingExperience}
                    onChange={(e) => handleChange('tradingExperience', e.target.value)}
                    label="Previous exposure to trading:"
                  >
                    <MenuItem value="none">None</MenuItem>
                    <MenuItem value="beginner">Beginner</MenuItem>
                    <MenuItem value="some">Some experience</MenuItem>
                    <MenuItem value="experienced">Experienced</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Section C: Account Setup */}
              <Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1a1a1a' }}>
                  C. Account Setup
                </Typography>
                
                {/* Create Password */}
                <TextField
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  label="Create Password"
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                  required
                  fullWidth
                  value={formData.password}
                  onChange={(e) => {
                    handleChange('password', e.target.value);
                    validatePassword(e.target.value);
                  }}
                  onFocus={() => {
                    setPasswordFocused(true);
                    setHasPasswordBeenFocused(true);
                  }}
                  onBlur={() => setPasswordFocused(false)}
                  variant="outlined"
                  sx={{ mb: 2.5 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                
                {/* Password Requirements */}
                {hasPasswordBeenFocused && (
                  <Paper variant="outlined" sx={{ mt: -1.5, mb: 2.5, p: 2, bgcolor: 'grey.50' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                      Password must contain:
                    </Typography>
                    <List dense disablePadding>
                      <ListItem disablePadding sx={{ py: 0.25 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          {passwordValidation.minLength ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <X className="w-4 h-4 text-gray-400" />
                          )}
                        </ListItemIcon>
                        <ListItemText 
                          primary="Minimum 8 characters"
                          primaryTypographyProps={{
                            variant: 'caption',
                            color: passwordValidation.minLength ? 'success.main' : 'text.secondary'
                          }}
                        />
                      </ListItem>
                      <ListItem disablePadding sx={{ py: 0.25 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          {passwordValidation.hasUppercase ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <X className="w-4 h-4 text-gray-400" />
                          )}
                        </ListItemIcon>
                        <ListItemText 
                          primary="1 uppercase letter"
                          primaryTypographyProps={{
                            variant: 'caption',
                            color: passwordValidation.hasUppercase ? 'success.main' : 'text.secondary'
                          }}
                        />
                      </ListItem>
                      <ListItem disablePadding sx={{ py: 0.25 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          {passwordValidation.hasLowercase ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <X className="w-4 h-4 text-gray-400" />
                          )}
                        </ListItemIcon>
                        <ListItemText 
                          primary="1 lowercase letter"
                          primaryTypographyProps={{
                            variant: 'caption',
                            color: passwordValidation.hasLowercase ? 'success.main' : 'text.secondary'
                          }}
                        />
                      </ListItem>
                      <ListItem disablePadding sx={{ py: 0.25 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          {passwordValidation.hasNumber ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <X className="w-4 h-4 text-gray-400" />
                          )}
                        </ListItemIcon>
                        <ListItemText 
                          primary="1 number"
                          primaryTypographyProps={{
                            variant: 'caption',
                            color: passwordValidation.hasNumber ? 'success.main' : 'text.secondary'
                          }}
                        />
                      </ListItem>
                      <ListItem disablePadding sx={{ py: 0.25 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          {passwordValidation.hasSpecialChar ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <X className="w-4 h-4 text-gray-400" />
                          )}
                        </ListItemIcon>
                        <ListItemText 
                          primary="1 special character (! @ # $ % & * _ - .)"
                          primaryTypographyProps={{
                            variant: 'caption',
                            color: passwordValidation.hasSpecialChar ? 'success.main' : 'text.secondary'
                          }}
                        />
                      </ListItem>
                    </List>
                  </Paper>
                )}

                {/* Confirm Password */}
                <TextField
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  label="Confirm Password"
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  required
                  fullWidth
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* Section D: Consent */}
              <Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1a1a1a' }}>
                  D. Consent
                </Typography>
                
                {/* Terms & Conditions Checkbox */}
                <FormControlLabel
                  control={
                    <Checkbox
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={(e) => handleChange('agreeToTerms', e.target.checked)}
                      sx={{
                        color: 'grey.400',
                        '&.Mui-checked': {
                          color: '#1A3D32',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: '0.875rem', color: 'grey.700' }}>
                      I agree to the Terms & Conditions
                    </Typography>
                  }
                  sx={{ mb: 1.5 }}
                />

                {/* Communications Checkbox */}
                <FormControlLabel
                  control={
                    <Checkbox
                      id="agreeToComms"
                      name="agreeToComms"
                      checked={formData.agreeToComms}
                      onChange={(e) => handleChange('agreeToComms', e.target.checked)}
                      sx={{
                        color: 'grey.400',
                        '&.Mui-checked': {
                          color: '#1A3D32',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: '0.875rem', color: 'grey.700' }}>
                      I consent to receive platform communications via email/WhatsApp
                    </Typography>
                  }
                />
              </Box>

              {/* Error Message */}
              {error && (
                <Alert severity="error" onClose={() => setError('')}>
                  {error}
                </Alert>
              )}

              {/* Success Message */}
              {successMessage && (
                <Alert severity="success" onClose={() => setSuccessMessage('')}>
                  {successMessage}
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={isLoading || !isFormValid}
                sx={{
                  mt: 1,
                  py: 1.5,
                  bgcolor: '#1A3D32',
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  '&:hover': {
                    bgcolor: '#142d25',
                  },
                  '&:disabled': {
                    bgcolor: 'grey.300',
                  }
                }}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </Box>

            {/* Login Link */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography component="span" sx={{ fontSize: '0.875rem', color: 'grey.600' }}>
                Already have an account?{' '}
              </Typography>
              <Button
                type="button"
                variant="text"
                onClick={onSwitchToSignIn}
                sx={{ 
                  textTransform: 'none', 
                  p: 0, 
                  minWidth: 0,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#1A3D32',
                  '&:hover': {
                    bgcolor: 'transparent',
                    textDecoration: 'underline',
                  }
                }}
              >
                Login
              </Button>
            </Box>
          </Paper>

          {/* Back to Home Link */}
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button
              onClick={onClose}
              variant="text"
              sx={{
                fontSize: '0.875rem',
                color: 'grey.600',
                textTransform: 'none',
                '&:hover': {
                  bgcolor: 'transparent',
                  color: 'grey.900',
                }
              }}
            >
              ← Back to home
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer hideAuthButtons={true} />
    </Box>
  );
}