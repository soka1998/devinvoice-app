import mongoose from "mongoose";
import crypto from "crypto";


// Schema for each line item in the invoice

const LineItemSchema = new mongoose.Schema({
    // Item description
    description: {
        type: String,
        required: [true, 'Please add an item description'],
        trim: true
    },
    // Item quantity
    quantity: {
        type: Number,
        required: true,
        min: [0.01, 'Quantity must be greater than 0'],
        default: 1
    },
    // Price for one unit
    unitPrice: {
        type: Number,
        required: true,
        min: [0, 'Unit price cannot be negative'],
    },
    // Tax rate in percentage
    taxRate: {
        type: Number,
        default: 20, //-Default 20% TVA
        min: 0,
        max: 100,
    },
    // Total amount for this item
    amount: {
        type: Number,
        required: true,
    }


});

//Main Invoice Schema 
const invoiceSchema = new mongoose.Schema(
    {
        // Unique invoice number
        invoiceNumber: {
            type: String,
            required: true,
            trim: true,
        },

        //Client details directly on the invoice
        client: {
            name: { type: String, required: true },
            companyName: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, default: '' },
            city: { type: String, default: 'casablanca' },
            address: { type: String, default: '' },
            taxId: { type: String, default: '' },//Ice / vat
        },

        // Date the invoice was created
        issueDate: {
            type: Date,
            default: Date.now,
        },
        // Last date to pay the invoice
        dueDate: {
            type: Date,
            required: true,
        },

        // Supported currencies
        currency: {
            type: String,
            enum: ['MAD', 'EUR', 'USD'],
            default: 'MAD',
        },

        // List of invoice items
        items: [LineItemSchema],

        // Total before tax
        subtotal: {
            type: Number,
            required: true,
            default: 0,
        },
        // Total tax amount
        taxTotal: {
            type: Number,
            required: true,
            default: 0,
        },

        // Final invoice amount
        total: {
            type: Number,
            required: true,
            default: 0,
        },

        // Current invoice status
        status: {
            type: String,
            enum: ['draft', 'pending', 'paid', 'overdue'],
            default: 'pending',
        },

        // How the client paid
        paymentMethod: {
            type: String,
            default: '',
        },

        // Date when invoice was paid
        paidAt: {
            type: Date,
        },

        // Additional invoice notes
        notes: {
            type: String,
            default: '',

        },

        // Random token for the client portal link
        // Example: /portal/:token

        portalToken: {
            type: String,
            default: () =>
                crypto.randomBytes(24).toString('hex'),
            unique: true,
        }
    },

    // Automatically adds createdAt and updatedAt
    {
        timestamps: true, //Automotically adds createdAt and updatedAt
    }

);