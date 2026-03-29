"use server"

// app/actions.ts

import { Resend } from 'resend';

export async function submitServiceRequest(formData: FormData) {
  const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    serviceType: formData.get("serviceType"),
    urgency: formData.get("urgency"),
    preferredDate: formData.get("preferredDate"),
  }

  // Basic Server-Side Validation
  if (!data.name || !data.phone || !data.address || !data.urgency || !data.serviceType) {
    return { success: false, message: "Please fill out all required fields." }
  }

  try {
    // MOCK RESEND INTEGRATION:
    const resend = new Resend(process.env.RESEND_API_KEY);
    // Format service type for display
    const serviceTypeLabels: Record<string, string> = {
      leak: "Leak Repair",
      clog: "Drain Cleaning",
      "water-heater": "Water Heater Service",
      installation: "New Installation",
      other: "Other"
    }
    const serviceName = serviceTypeLabels[data.serviceType as string] || data.serviceType;

    // Format urgency level for display
    const urgencyLabels: Record<string, string> = {
      emergency: "🚨 EMERGENCY - Immediate Response Needed",
      soon: "High Priority - Next 24 Hours",
      routine: "Routine - Flexible Scheduling"
    }
    const urgencyDisplay = urgencyLabels[data.urgency as string] || data.urgency;

    // Format preferred date
    const preferredDateDisplay = data.preferredDate 
      ? new Date(data.preferredDate as string).toLocaleString('en-US', { 
          weekday: 'short', 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      : "Customer will be available based on technician schedule";

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { padding: 20px; }
            .section { margin-bottom: 20px; }
            .section-title { font-size: 14px; font-weight: bold; color: #667eea; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 1px; }
            .info-row { display: flex; margin-bottom: 10px; }
            .label { font-weight: bold; color: #333; min-width: 140px; }
            .value { color: #555; }
            .urgency-high { background: #fee; padding: 12px; border-left: 4px solid #d32f2f; border-radius: 4px; }
            .urgency-medium { background: #fff3e0; padding: 12px; border-left: 4px solid #f57c00; border-radius: 4px; }
            .urgency-low { background: #f1f8e9; padding: 12px; border-left: 4px solid #558b2f; border-radius: 4px; }
            .footer { background: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #eee; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📋 New Service Request</h1>
            </div>
            
            <div class="content">
              <!-- Urgency Level -->
              <div class="section">
                <div class="urgency-${data.urgency === 'emergency' ? 'high' : data.urgency === 'soon' ? 'medium' : 'low'}">
                  <strong>${urgencyDisplay}</strong>
                </div>
              </div>

              <!-- Customer Contact Information -->
              <div class="section">
                <div class="section-title">👤 Customer Information</div>
                <div class="info-row">
                  <div class="label">Name:</div>
                  <div class="value"><strong>${data.name}</strong></div>
                </div>
                <div class="info-row">
                  <div class="label">Phone:</div>
                  <div class="value"><a href="tel:${data.phone}" style="color: #667eea; text-decoration: none;"><strong>${data.phone}</strong></a></div>
                </div>
                <div class="info-row">
                  <div class="label">Address:</div>
                  <div class="value"><strong>${data.address}</strong></div>
                </div>
              </div>

              <!-- Service Details -->
              <div class="section">
                <div class="section-title">🔧 Service Required</div>
                <div class="info-row">
                  <div class="label">Service Type:</div>
                  <div class="value"><strong>${serviceName}</strong></div>
                </div>
                <div class="info-row">
                  <div class="label">Preferred Date/Time:</div>
                  <div class="value"><strong>${preferredDateDisplay}</strong></div>
                </div>
              </div>

              <!-- Call to Action -->
              <div class="section" style="background: #f0f4ff; padding: 15px; border-radius: 4px; text-align: center;">
                <p style="margin: 0; color: #667eea; font-weight: bold;">
                  ☎️ <a href="tel:${data.phone}" style="color: #667eea; text-decoration: none;">Click to call customer</a>
                </p>
              </div>
            </div>

            <div class="footer">
              <p>This request was submitted through the Fabian Salts service portal.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'gcarson1@vols.utk.edu',
      subject: `${urgencyDisplay.split(' ')[0]} Plumbing Request: ${data.name} - ${serviceName}`,
      html: emailHtml,
    });

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { 
      success: true, 
      message: "Request received! We will call you within 15 minutes to confirm." 
    }
  } catch (error) {
    return { 
      success: false, 
      message: "Something went wrong. Please call us directly." 
    }
  }
}