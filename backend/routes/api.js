const express = require("express");
const multer = require("multer");
const path = require("path");

const contactController = require("../controllers/ContactController");
const AdminController = require("../controllers/AdminController");

const FaqController = require("../controllers/FaqController");
const BrandController = require("../controllers/BrandController");
const ResultController = require("../controllers/ResultController");
const blogController = require("../controllers/BlogController");
const TestimonialController = require("../controllers/TestimonialController");

// Admin
const { adminProtect } = require("../middlewares/authAdminMiddleware");

const { authenticateToken } = require("../middlewares/authenticateToken");

require("dotenv").config();

const router = express.Router();

// Set Up Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // Ensure files are saved in the 'uploads' folder
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)), // Naming files uniquely
});

const upload = multer({ storage }).fields([
  {
    name: "PrimaryLogo",
    maxCount: 1,
  },
  {
    name: "SecondaryLogo",
    maxCount: 1,
  },
  {
    name: "Favicon",
    maxCount: 1,
  },
  {
    name: "imgSrc",
    maxCount: 20,
  },
  {
    name: "categoryIcon",
    maxCount: 1,
  },
  {
    name: "categoryBanner",
    maxCount: 1,
  },
  {
    name: "thumbnailImage",
    maxCount: 1,
  },
  {
    name: "images",
  },
  {
    name: "userImage",
    maxCount: 1,
  },
]);

// Serve images from the 'uploads' folder as static files
router.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes for Contact Us Form
router.post("/contacts", contactController.createContact);
router.get("/contacts", adminProtect,  contactController.getAllContacts);
router.get("/contacts/:id", adminProtect, contactController.getContactById);
router.put("/contacts/:id", adminProtect, contactController.updateContact);
router.delete("/contacts/:id", adminProtect, contactController.deleteContact);

// Admin Login route
router.post("/admin/login", AdminController.loginAdmin);
router.get("/admin/me", authenticateToken, AdminController.getLoggedInAdmin);

// CRUD routes for Admin User
router.post("/admin/create", AdminController.createAdmin);
router.get("/admin/getall", AdminController.getAllAdmins);
router.get("/admin/:id", adminProtect, AdminController.getAdminById);
router.put("/admin/:id", adminProtect, AdminController.updateAdmin);
router.delete("/admin/:id", adminProtect, AdminController.deleteAdmin);

// FAQ's Routes
router.get("/faq", FaqController.getAllFAQs);
router.get("/faq/:id", FaqController.getSingleFAQ);
router.patch("/faq/:id", adminProtect, FaqController.updateFAQ);
router.delete("/faq/:id", adminProtect, FaqController.deleteFAQ);
router.post("/faq", adminProtect, FaqController.createFAQ);

//  Routes for Brands
router.post(
  "/createcarousel",
  upload,
  adminProtect,
  BrandController.createCarousel,
);
router.get("/getallcarousel", BrandController.getAllCarousel);

router.delete(
  "/deletebyidcarousel/:id",
  adminProtect,
  BrandController.deleteByIdCarousel,
);

//  Routes for Testimonial
router.post(
  "/createtestimonial",
  upload,
  adminProtect,
  TestimonialController.createCarousel,
);

router.get("/getalltestimonial", TestimonialController.getAllCarousel);

router.delete(
  "/deletebyidtestimonial/:id",
  adminProtect,
  TestimonialController.deleteByIdCarousel,
);

//  Routes for Results
router.post(
  "/createresults",
  upload,
  adminProtect,
  ResultController.createCarousel,
);
router.get("/getallresults", ResultController.getAllCarousel);

router.delete(
  "/deletebyidresults/:id",
  adminProtect,
  ResultController.deleteByIdCarousel,
);

// Routes for Blogs
router.post("/blog", upload, adminProtect, blogController.createBlog);
router.get("/blog", blogController.getAllBlogs);
router.get("/activeblog", blogController.getActiveBlogs);
router.get("/blog/slug/:slug", blogController.getBlogBySlug);
router.get("/blog/:id", blogController.getBlogById);
router.patch("/blog/:id", upload, adminProtect, blogController.updateBlog);
router.delete("/blog/:id", adminProtect, blogController.deleteBlog);

module.exports = router;
