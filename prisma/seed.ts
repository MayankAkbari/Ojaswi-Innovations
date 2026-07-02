import { PrismaClient, Role, OrderStatus, TrackerStage, ReviewStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Ojaswi Innovations enterprise platform database...');

  // 1. Clean existing data
  await prisma.auditLog.deleteMany();
  await prisma.review.deleteMany();
  await prisma.aMCRequest.deleteMany();
  await prisma.projectTracker.deleteMany();
  await prisma.order.deleteMany();
  await prisma.proposal.deleteMany();
  await prisma.packageEdition.deleteMany();
  await prisma.package.deleteMany();
  await prisma.portfolioItem.deleteMany();
  await prisma.siteConfig.deleteMany();
  await prisma.user.deleteMany();

  // 2. Seed Users
  const adminUser = await prisma.user.create({
    data: {
      fullName: 'Respected Administrative Head',
      email: 'admin@ojaswi.com',
      phone: '+917069424393',
      passwordHash: 'Admin@123', // In demo, direct check or simple comparison
      role: Role.ADMIN,
      city: 'Ahmedabad',
      state: 'Gujarat'
    }
  });

  const customerUser = await prisma.user.create({
    data: {
      fullName: 'Rajesh Bhai Patel',
      email: 'customer@ojaswi.com',
      phone: '+919876543210',
      passwordHash: 'Customer@123',
      role: Role.CUSTOMER,
      addressLine1: '402, Tejomay Tower, S.G. Highway',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380015'
    }
  });

  // 3. Seed Site Config
  await prisma.siteConfig.createMany({
    data: [
      { key: 'amc_regular_price', value: '8996' },
      { key: 'amc_promo_price', value: '5500' },
      { key: 'amc_offer_title', value: 'Independence Day Special Offer' },
      { key: 'amc_offer_expiry', value: '2026-08-20T23:59:59Z' },
      { key: 'whatsapp_number', value: '917069424393' }
    ]
  });

  // 4. Seed Packages & Editions
  const someshwar = await prisma.package.create({
    data: {
      slug: 'someshwar',
      name: 'The Someshwar Package',
      maxPages: 8,
      hasAdminPanel: false,
      editions: {
        create: [
          {
            name: 'Prarambh Edition',
            hostingYears: 1,
            domainYears: 1,
            freeChangesMonths: 1,
            supportType: '1 Year Customer Support (09:00 AM – 07:00 PM)',
            price: 41998,
            discountPrice: 32997,
            features: JSON.stringify([
              'Maximum 8-page custom responsive website',
              '1 Year Premium High-Speed Hosting',
              '1 Year Custom Domain Registration (.com / .in)',
              '1 Month Free Post-Delivery Changes Commitment',
              'Dedicated WhatsApp Business Inquiry Button',
              'Standard SEO Meta Setup & Google Indexing',
              '48-Hour Rapid Delivery Guarantee'
            ])
          },
          {
            name: 'Chaturyug Edition',
            hostingYears: 4,
            domainYears: 4,
            freeChangesMonths: 6,
            supportType: '1 Year 24×7 Support + 3 Year Business Hours Support',
            price: 56898,
            discountPrice: 47985,
            features: JSON.stringify([
              'Maximum 8-page custom responsive website',
              '4 Years Premium High-Speed Hosting Included',
              '4 Years Custom Domain Registration (.com / .in)',
              '6 Months Free Post-Delivery Changes Commitment',
              '1 Year 24×7 Priority WhatsApp Support',
              '3 Years Business Hours Technical Support',
              'Advanced SEO Optimization & Schema Setup',
              '48-Hour Rapid Delivery Guarantee'
            ])
          }
        ]
      }
    }
  });

  const adityanarayan = await prisma.package.create({
    data: {
      slug: 'adityanarayan',
      name: 'The Adityanarayan Package',
      maxPages: 20,
      hasAdminPanel: false,
      editions: {
        create: [
          {
            name: 'Prarambh Edition',
            hostingYears: 1,
            domainYears: 1,
            freeChangesMonths: 1,
            supportType: '1 Year Customer Support (09:00 AM – 07:00 PM)',
            price: 52898,
            discountPrice: 46985,
            features: JSON.stringify([
              'Maximum 20-page comprehensive business website',
              '1 Year Premium High-Speed Hosting',
              '1 Year Custom Domain Registration (.com / .in)',
              '1 Month Free Post-Delivery Changes Commitment',
              'Multi-Service Product Showcase Catalog',
              'Interactive Contact & Lead Capture Forms',
              '48-Hour Rapid Delivery Guarantee'
            ])
          },
          {
            name: 'Chaturyug Edition',
            hostingYears: 4,
            domainYears: 4,
            freeChangesMonths: 6,
            supportType: '1 Year 24×7 Support + 3 Year Business Hours Support',
            price: 73898,
            discountPrice: 68985,
            features: JSON.stringify([
              'Maximum 20-page comprehensive business website',
              '4 Years Premium High-Speed Hosting Included',
              '4 Years Custom Domain Registration (.com / .in)',
              '6 Months Free Post-Delivery Changes Commitment',
              '1 Year 24×7 Priority WhatsApp Support',
              'Advanced Lead Analytics & Conversion Tracking',
              '48-Hour Rapid Delivery Guarantee'
            ])
          }
        ]
      }
    }
  });

  const trivikram = await prisma.package.create({
    data: {
      slug: 'trivikram',
      name: 'The Trivikram Package',
      maxPages: null, // Unlimited
      hasAdminPanel: true,
      editions: {
        create: [
          {
            name: 'Prarambh Edition',
            hostingYears: 1,
            domainYears: 1,
            freeChangesMonths: 3,
            supportType: '1 Year 24×7 Priority Support',
            price: 71998,
            discountPrice: 65997,
            features: JSON.stringify([
              'Unlimited Pages — Enterprise Grade Scalability',
              'Includes Special Custom Admin Panel & CRM',
              'Inquiry, Appointment & Business Management Tools',
              '1 Year Premium High-Speed Hosting',
              '1 Year Custom Domain Registration (.com / .in)',
              '3 Months Free Post-Delivery Changes Commitment',
              '1 Year 24×7 Dedicated VIP Support',
              '48-Hour Rapid Delivery Guarantee'
            ])
          },
          {
            name: 'Chaturyug Edition',
            hostingYears: 4,
            domainYears: 4,
            freeChangesMonths: 12,
            supportType: 'Dedicated Account Manager + 4 Year VIP Support',
            price: 82898,
            discountPrice: 76985,
            features: JSON.stringify([
              'Unlimited Pages — Enterprise Grade Scalability',
              'Includes Special Custom Admin Panel & CRM',
              'Inquiry, Appointment & Business Management Tools',
              '4 Years Premium High-Speed Hosting Included',
              '4 Years Custom Domain Registration (.com / .in)',
              '1 Full Year Free Post-Delivery Changes Commitment',
              'Dedicated Account Manager + VIP Support',
              '48-Hour Rapid Delivery Guarantee'
            ])
          }
        ]
      }
    }
  });

  // 5. Seed Portfolio Items (16 Categories)
  const portfolioData = [
    { industry: 'Private Hospitals', title: 'Aarogya Multi-Specialty Hospital', description: 'Appointment booking & doctor profiles built for patient trust and immediate emergency contact.' },
    { industry: 'Textile Manufacturers', title: 'Shree Fabrics Export Corporation', description: 'High-resolution wholesale fabric catalog displays with B2B inquiry export pipelines.' },
    { industry: 'Packaging Companies', title: 'Apex Corrugated Packaging Solutions', description: 'Box dimension calculation quote request forms and industrial client testimonials.' },
    { industry: 'Real Estate', title: 'Tejomay Heights Luxury Living', description: '3D virtual walkthrough gallery, downloadable brochures, and WhatsApp site visit booking.' },
    { industry: 'Interior Designers', title: 'Vogue Spaces Interior Studio', description: 'Before-and-after project sliders with modular kitchen estimation calculator.' },
    { industry: 'Hotels', title: 'The Royal Heritage Resort', description: 'Room booking availability request and wedding banquet hall tour booking.' },
    { industry: 'Wedding Planners', title: 'Mangalam Grand Events & Planners', description: 'Exquisite bridal decoration showcase and custom theme package selector.' },
    { industry: 'Garment Wholesalers', title: 'Surat Silk Mill Direct Outlet', description: 'Wholesale minimum order catalog with bulk WhatsApp ordering interface.' },
    { industry: 'Jewellery Stores', title: 'Mahalakshmi Gold & Diamond Jewels', description: 'Live gold rate ticker bar with high-end diamond collection zoom display.' },
    { industry: 'Chartered Accountants', title: 'Shah & Associates Financial Advisors', description: 'GST filing deadline calculator and secure client document portal inquiry.' },
    { industry: 'Logistics Companies', title: 'Express Cargo & Supply Chain India', description: 'Live consignment tracking simulator and pan-India freight quote calculator.' },
    { industry: 'Cafes', title: 'Brew & Beans Artisan Cafe', description: 'Interactive digital QR menu display with online table reservation system.' },
    { industry: 'Agriculture Exporters', title: 'Kisan Global Organic Agro Exports', description: 'International quality certification badges and bulk shipment container tracking.' },
    { industry: 'Builders', title: 'Sankalp Commercial Constructions', description: 'Ongoing structural milestone updates and investor PDF brochure downloads.' },
    { industry: 'Infrastructure Companies', title: 'Highway Engineering Projects Ltd', description: 'Government tender display and heavy machinery fleet showcase.' },
    { industry: 'Dairy Businesses', title: 'Amrut Milk & Dairy Products', description: 'Daily distributor route booking and organic milk farm quality story.' }
  ];

  for (let i = 0; i < portfolioData.length; i++) {
    const item = portfolioData[i];
    await prisma.portfolioItem.create({
      data: {
        industry: item.industry,
        title: item.title,
        description: item.description,
        thumbnailUrl: i === 0 ? '/portfolio/aarogya-logo.png' : i === 1 ? '/portfolio/shree-fabrics-logo.png' : i === 2 ? '/portfolio/apex-corrugated-logo.png' : `https://images.unsplash.com/photo-${1500000000000 + i * 1000000}?auto=format&fit=crop&w=600&q=80`,
        liveUrl: i === 0 ? 'https://aarogya-multi-specialty-hospital.vercel.app/' : i === 1 ? 'https://shree-fabrics-export-corp.vercel.app/' : i === 2 ? 'https://apex-corrugated-solutions.vercel.app/' : 'https://ojaswi.com/demo',
        order: i + 1
      }
    });
  }

  // 6. Seed Demo Order & Tracker for Customer
  const someshwarChaturyug = await prisma.packageEdition.findFirst({
    where: { name: 'Chaturyug Edition', package: { slug: 'someshwar' } }
  });

  if (someshwarChaturyug) {
    const order = await prisma.order.create({
      data: {
        userId: customerUser.id,
        packageEditionId: someshwarChaturyug.id,
        status: OrderStatus.APPROVED,
        amountPaid: 47985,
        approvedAt: new Date(),
        approvedBy: adminUser.fullName
      }
    });

    await prisma.projectTracker.create({
      data: {
        orderId: order.id,
        stage: TrackerStage.CLIENT_CHANGES_APPROVAL,
        notes: 'Initial homepage and services pages completed in 36 hours. Awaiting client review on logo alignment.',
        updatedBy: adminUser.fullName
      }
    });
  }

  // 7. Seed Reviews
  await prisma.review.createMany({
    data: [
      {
        userId: customerUser.id,
        rating: 5,
        text: 'Ojaswi delivered our textile export portal in exactly 44 hours. The custom product inquiry form increased our WhatsApp lead velocity by 300%!',
        status: ReviewStatus.APPROVED,
        isFeatured: true
      },
      {
        userId: customerUser.id,
        rating: 5,
        text: 'The free post-delivery modifications saved us when we had to update our Diwali packaging pricing catalog. Truly lowest AMC in Gujarat!',
        status: ReviewStatus.APPROVED,
        isFeatured: true
      },
      {
        userId: customerUser.id,
        rating: 5,
        text: 'Trivikram package admin portal allows my staff to manage patient appointments effortlessly. Highly recommended!',
        status: ReviewStatus.APPROVED,
        isFeatured: true
      }
    ]
  });

  console.log('✅ Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
