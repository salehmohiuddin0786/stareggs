/**
 * Helper to build clean, pre-filled official WhatsApp links for Star Eggs leads.
 */
export function getWhatsAppLink({
  type = 'GENERAL',
  businessName = '',
  district = '',
  volume = '',
  product = '',
} = {}) {
  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
  const cleanNumber = rawNumber.replace(/[^0-9]/g, '');

  let text = '';

  switch (type) {
    case 'WHOLESALE':
      text = `Hello Star Eggs Team,\n\nI am contacting you regarding Wholesale Pricing for my business.\n\n• Business Name: ${businessName || 'N/A'}\n• District / Location: ${district || 'Telangana'}\n• Product Requirement: ${product || 'Commercial White Egg Trays'}\n• Estimated Volume: ${volume || 'Regular Bulk'}\n\nPlease share current wholesale quotation and delivery terms.`;
      break;

    case 'RETAIL':
      text = `Hello Star Eggs Team,\n\nI run a retail shop/supermarket and would like to enquire about regular egg supply.\n\n• Business Name: ${businessName || 'Retail Shop'}\n• District / Area: ${district || 'Adilabad / Telangana'}\n• Required Frequency: Daily / Regular\n\nPlease let me know your delivery routes and minimum order terms.`;
      break;

    case 'DISTRIBUTION':
      text = `Hello Star Eggs Team,\n\nI am interested in becoming a Distribution Partner in Telangana.\n\n• Business / Name: ${businessName || 'Distribution Applicant'}\n• Target District: ${district || 'Telangana District'}\n• Monthly Capacity: ${volume || 'High-volume'}\n\nKindly share partnership requirements and discuss expansion details.`;
      break;

    case 'PRODUCT':
      text = `Hello Star Eggs Team,\n\nI am interested in ordering: ${product || 'Star Eggs Products'}.\n\n• District: ${district || 'Adilabad / Telangana'}\n\nPlease share availability and wholesale pricing details.`;
      break;

    case 'GENERAL':
    default:
      text = `Hello Star Eggs Team,\n\nI am visiting your website and have an enquiry regarding egg supply in Telangana. Please connect with me.`;
      break;
  }

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}
