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
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'gcarson1@vols.utk.edu',
      subject: `🚨 ${data.urgency} Plumbing Request: ${data.name}`,
      html: `<p>New request from ${data.name} at ${data.address}. Issue: ${data.serviceType}.</p>`,
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