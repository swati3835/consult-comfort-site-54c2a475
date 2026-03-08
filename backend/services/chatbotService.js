const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Detect user intent
 */
function detectIntent(message) {
  const msg = message.toLowerCase();

  if (msg.includes("available doctors") || msg.includes("show doctors")) {
    return "SHOW_DOCTORS";
  }

  if (msg.includes("consultation")) {
    return "BOOK_CONSULTATION";
  }

  if (msg.includes("services")) {
    return "VIEW_SERVICES";
  }

  return "DEFAULT";
}

/**
 * Generate response based on intent
 */
async function generateResponse(intent, message) {
  switch (intent) {
    case "SHOW_DOCTORS": {
      const doctors = await prisma.doctor.findMany({
        select: {
          doctorId: true,
          name: true,
          specialty: true,
          department: true,
          experience: true,
          image: true
        }
      });
    
      if (!doctors.length) {
        return {
          message: "Currently no doctors are available for booking.",
          suggestions: ["View Services", "Contact Us"]
        };
      }
    
      return {
        message: "Here are our available doctors:",
        doctors: doctors
      };
    }

    case "VIEW_SERVICES":
      return {
        message: `
    Our Healthcare Services
    
    1. Teleconsultation  
    Video consultation with experienced and verified doctors.  
    • Duration: Up to 30 minutes  
    • Includes digital prescription  
    • 7-day follow-up support  
    
    2. Second Opinion  
    Expert medical review of your reports and case history.  
    • Detailed medical analysis  
    • Alternative treatment options  
    • Digital report included  
    • Free follow-up consultation  
    
    3. Board Review  
    Multi-specialist panel review for complex medical cases.  
    • Comprehensive board report  
    • Treatment recommendations  
    • Priority handling  
    • Free follow-up consultation  
        `,
        suggestions: [
          "Book Teleconsultation",
          "Book Second Opinion",
          "Book Board Review"
        ]
      };
    case "BOOK_CONSULTATION":
      return {
        message:
          "You can book a consultation by selecting an available doctor.\n\nWould you like to see available doctors?",
        suggestions: ["Show available doctors"]
      };

    default:
      return {
        message:
          "👋 Welcome to KANT Healthcare.\n\nYou can ask:\n• Show available doctors\n• Book consultation\n• View services",
        suggestions: [
          "Show available doctors",
          "Book consultation",
          "View services"
        ]
      };
  }
}

module.exports = {
  detectIntent,
  generateResponse
};