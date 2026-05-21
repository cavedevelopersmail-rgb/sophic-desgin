const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const authMiddleware = require("../middlewares/authMiddleware");

// Public routes
router.post("/", contactController.createContact);

// Protected admin routes
router.use(authMiddleware);

router.get("/", contactController.getAllContacts);
router.get("/:id", contactController.getContactById);
router.put("/:id", contactController.updateContact);
router.delete("/:id", contactController.deleteContact);

// Notes routes
router.post("/:id/notes", contactController.addNoteToContact);

module.exports = router;
