import React from 'react'
import { Check } from 'lucide-react'

const STEPS = [
  { id: 1, label: 'Delivery' },
  { id: 2, label: 'Address' },
  { id: 3, label: 'Payment' },
  { id: 4, label: 'Review' },
]

export default function CheckoutStepper({ currentStep, isPickup }) {
  const steps = isPickup
    ? [
        { id: 1, label: 'Pickup' },
        { id: 2, label: 'Payment' },
        { id: 3, label: 'Review' },
      ]
    : [
        { id: 1, label: 'Delivery' },
        { id: 2, label: 'Address' },
        { id: 3, label: 'Payment' },
        { id: 4, label: 'Review' },
      ]

  return (
    <nav aria-label="Checkout steps" className="stepper">
      {steps.map((step, idx) => {
        const completed = currentStep > step.id
        const active = currentStep === step.id
        return (
          <React.Fragment key={step.id}>
            <div className="step">
              <div className={`step-circle ${active ? 'active' : ''} ${completed ? 'completed' : ''}`}>
                {completed ? <Check size={16} /> : step.id}
              </div>
              <span className={`step-label ${active ? 'active' : ''} ${completed ? 'completed' : ''}`}>
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`step-connector ${completed ? 'completed' : ''}`} />
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}
