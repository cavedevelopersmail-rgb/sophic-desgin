const Contact = require("../models/contact.js");
// const nodemailer = require("nodemailer");

// // Configure email transporter
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   secure: process.env.SMTP_SECURE === "true",
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

// Create new contact submission
exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, company, service, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      phone,
      company,
      service,
      message,
    });

    const savedContact = await newContact.save();

    // // Send confirmation email to user
    // const userMailOptions = {
    //   from: `"Sophic Designs private limited " <${process.env.SMTP_FROM}>`,
    //   to: email,
    //   subject: "Thank You for Contacting Sophic Designs private limited ",
    //   html: `
    //     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    //       <h2 style="color: #00353E;">Thank You for Contacting Sophic Designs private limited !</h2>
    //       <p>Dear ${name},</p>
    //       <p>We've received your inquiry and our team will get back to you within 24-48 hours.</p>
    //       <p><strong>Summary of your inquiry:</strong></p>
    //       <ul>
    //         <li><strong>Service:</strong> ${service || "Not specified"}</li>
    //         <li><strong>Message:</strong> ${message}</li>
    //       </ul>
    //       <p>If you have any urgent questions, please call our support team at +91 120 4567890.</p>
    //       <p>Best regards,<br>The Sophic Designs private limited Team</p>
    //       <hr>
    //       <p style="font-size: 12px; color: #666;">
    //         Sophic Designs private limited Pvt. Ltd.<br>
    //         Delhi Office: A-123, Sector 63, Noida, Delhi NCR - 201301<br>
    //         Faridabad Office: Plot No. 45, Industrial Area, Faridabad, Haryana - 121003
    //       </p>
    //     </div>
    //   `,
    // };

    // // Send notification to admin
    // const adminMailOptions = {
    //   from: `"Sophic Designs private limited Contact" <${process.env.SMTP_FROM}>`,
    //   to: process.env.ADMIN_EMAIL,
    //   subject: `New Contact Submission: ${name}`,
    //   text: `
    //     New contact form submission:
    //     Name: ${name}
    //     Email: ${email}
    //     Phone: ${phone || "Not provided"}
    //     Company: ${company || "Not provided"}
    //     Service: ${service || "Not specified"}
    //     Message: ${message}

    //     View in dashboard: ${process.env.ADMIN_DASHBOARD_URL}/contacts/${
    //     savedContact._id
    //   }
    //   `,
    // };

    // // Send emails
    // await transporter.sendMail(userMailOptions);
    // await transporter.sendMail(adminMailOptions);

    res.status(201).json({
      success: true,
      message: "Thank you for your submission! We will contact you soon.",
      data: savedContact,
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit contact form",
      error: error.message,
    });
  }
};

// Get all contacts (for admin dashboard)
exports.getAllContacts = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    const skip = (page - 1) * limit;

    let query = {};

    if (status) query.status = status;
    if (search) query.$text = { $search: search };

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate("assignedTo", "name email")
      .lean();

    const total = await Contact.countDocuments(query);

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch contacts",
      error: error.message,
    });
  }
};

// Get single contact by ID
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("notes.createdBy", "name");

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch contact",
      error: error.message,
    });
  }
};

// Update contact status or assignment
exports.updateContact = async (req, res) => {
  try {
    const { status, assignedTo } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (assignedTo) updateData.assignedTo = assignedTo;

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedContact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update contact",
      error: error.message,
    });
  }
};

// Add note to contact
exports.addNoteToContact = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id; // Assuming authenticated user

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    contact.notes.push({
      content,
      createdBy: userId,
    });

    const updatedContact = await contact.save();

    res.status(200).json({
      success: true,
      data: updatedContact.notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add note",
      error: error.message,
    });
  }
};

// Delete contact (admin only)
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete contact",
      error: error.message,
    });
  }
};
