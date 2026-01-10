import * as React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { styled } from '@mui/material/styles';
import { LucideIcon } from 'lucide-react';

export interface StepConfig {
  label: string;
  icon: LucideIcon;
  description?: string;
}

interface AnimatedStepperProps {
  steps: StepConfig[];
  activeStep: number;
  colorScheme?: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  orientation?: 'horizontal' | 'vertical';
  showDescription?: boolean;
  variant?: 'default' | 'compact' | 'elegant';
}

// Custom Connector with gradient
const CustomConnector = styled(StepConnector)<{ gradientColor?: string }>(
  ({ theme, gradientColor }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 28,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          gradientColor ||
          'linear-gradient(90deg, #2563eb 0%, #7c3aed 25%, #059669 50%, #dc2626 75%, #ea580c 100%)',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          gradientColor ||
          'linear-gradient(90deg, #2563eb 0%, #7c3aed 25%, #059669 50%, #dc2626 75%, #ea580c 100%)',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor: '#e5e7eb',
      borderRadius: 1,
    },
  })
);

// Vertical Connector
const VerticalConnector = styled(StepConnector)<{ gradientColor?: string }>(
  ({ theme, gradientColor }) => ({
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          gradientColor ||
          'linear-gradient(180deg, #2563eb 0%, #7c3aed 50%, #059669 100%)',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          gradientColor ||
          'linear-gradient(180deg, #2563eb 0%, #7c3aed 50%, #059669 100%)',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      width: 3,
      border: 0,
      backgroundColor: '#e5e7eb',
      borderRadius: 1,
      minHeight: 24,
    },
  })
);

// Custom Step Icon Root
const CustomStepIconRoot = styled('div')<{
  ownerState: {
    completed?: boolean;
    active?: boolean;
    primaryColor?: string;
    secondaryColor?: string;
  };
}>(({ theme, ownerState }) => {
  const primaryColor = ownerState.primaryColor || '#2563eb';
  const secondaryColor = ownerState.secondaryColor || '#3b82f6';

  return {
    backgroundColor: '#e5e7eb',
    zIndex: 1,
    color: '#9ca3af',
    width: 56,
    height: 56,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '3px solid white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    ...(ownerState.active && {
      background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
      boxShadow: `0 8px 20px ${primaryColor}50`,
      transform: 'scale(1.15)',
      color: '#fff',
      border: `3px solid ${primaryColor}30`,
    }),
    ...(ownerState.completed && {
      background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
      boxShadow: `0 4px 12px ${primaryColor}35`,
      color: '#fff',
      border: `3px solid ${primaryColor}20`,
    }),
    '&:hover': {
      transform: ownerState.active ? 'scale(1.15)' : 'scale(1.08)',
      boxShadow: ownerState.active
        ? `0 8px 20px ${primaryColor}50`
        : '0 4px 12px rgba(0,0,0,0.15)',
    },
  };
});

// Compact Step Icon (smaller)
const CompactStepIconRoot = styled('div')<{
  ownerState: {
    completed?: boolean;
    active?: boolean;
    primaryColor?: string;
    secondaryColor?: string;
  };
}>(({ theme, ownerState }) => {
  const primaryColor = ownerState.primaryColor || '#2563eb';
  const secondaryColor = ownerState.secondaryColor || '#3b82f6';

  return {
    backgroundColor: '#f3f4f6',
    zIndex: 1,
    color: '#9ca3af',
    width: 40,
    height: 40,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.3s ease',
    border: '2px solid #e5e7eb',
    ...(ownerState.active && {
      backgroundColor: primaryColor,
      color: '#fff',
      border: `2px solid ${primaryColor}`,
      boxShadow: `0 4px 12px ${primaryColor}40`,
      transform: 'scale(1.1)',
    }),
    ...(ownerState.completed && {
      backgroundColor: primaryColor,
      color: '#fff',
      border: `2px solid ${primaryColor}`,
    }),
  };
});

export function AnimatedStepper({
  steps,
  activeStep,
  colorScheme = {
    primary: '#2563eb',
    secondary: '#3b82f6',
    gradient: 'linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)',
  },
  orientation = 'horizontal',
  showDescription = false,
  variant = 'default',
}: AnimatedStepperProps) {
  // Custom Step Icon Component
  function CustomStepIcon(props: StepIconProps) {
    const { active, completed, className, icon } = props;
    const stepIndex = Number(icon) - 1;
    const StepIconComponent = steps[stepIndex]?.icon;

    const IconRoot = variant === 'compact' ? CompactStepIconRoot : CustomStepIconRoot;
    const iconSize = variant === 'compact' ? 20 : 28;

    return (
      <IconRoot
        ownerState={{
          completed,
          active,
          primaryColor: colorScheme.primary,
          secondaryColor: colorScheme.secondary,
        }}
        className={className}
      >
        {StepIconComponent && (
          <StepIconComponent
            style={{ width: iconSize, height: iconSize }}
            strokeWidth={2.5}
          />
        )}
      </IconRoot>
    );
  }

  const ConnectorComponent =
    orientation === 'vertical' ? (
      <VerticalConnector gradientColor={colorScheme.gradient} />
    ) : (
      <CustomConnector gradientColor={colorScheme.gradient} />
    );

  return (
    <Paper
      elevation={variant === 'elegant' ? 2 : 0}
      sx={{
        p: variant === 'compact' ? 2 : 4,
        borderRadius: variant === 'elegant' ? 3 : 4,
        bgcolor: 'white',
        border: variant === 'elegant' ? 'none' : '1px solid #e5e7eb',
        boxShadow:
          variant === 'elegant'
            ? '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)'
            : 'none',
      }}
    >
      <Stepper
        alternativeLabel={orientation === 'horizontal'}
        activeStep={activeStep}
        connector={ConnectorComponent}
        orientation={orientation}
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              StepIconComponent={CustomStepIcon}
              sx={{
                '& .MuiStepLabel-label': {
                  marginTop: orientation === 'horizontal' ? 2 : 0,
                  marginLeft: orientation === 'vertical' ? 2 : 0,
                  fontWeight: index === activeStep ? 700 : 600,
                  fontSize: variant === 'compact' ? '0.813rem' : '0.875rem',
                  color: index === activeStep ? colorScheme.primary : '#6b7280',
                  transition: 'all 0.3s ease',
                  '&.Mui-active': {
                    color: colorScheme.primary,
                    fontWeight: 700,
                  },
                  '&.Mui-completed': {
                    color: '#10b981',
                    fontWeight: 600,
                  },
                },
              }}
            >
              {step.label}
              {showDescription && step.description && (
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    color: 'text.secondary',
                    mt: 0.5,
                    fontSize: '0.75rem',
                  }}
                >
                  {step.description}
                </Typography>
              )}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Paper>
  );
}
