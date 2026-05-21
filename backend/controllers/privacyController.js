const Privacy = require('../models/Privacy');

// // @desc    Get privacy policy
// // @route   GET /api/privacy
// // @access  Public
// const getPrivacy = async (req, res) => {
//   try {
//     let privacy = await Privacy.findOne();
    
//     if (!privacy) {
//       // Create default privacy policy if none exists
//       privacy = new Privacy({
//         title: 'Privacy Policy',
//         content: 'Default privacy policy content. Please update this through the admin panel.',
//         version: '1.0'
//       });
//       await privacy.save();
//     }

//     res.json({
//       success: true,
//       privacy
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// };

// // @desc    Update privacy policy
// // @route   PUT /api/privacy
// // @access  Private (Admin only)
// const updatePrivacy = async (req, res) => {
//   try {
//     const { title, content, version } = req.body;

//     if (!content) {
//       return res.status(400).json({
//         success: false,
//         message: 'Content is required'
//       });
//     }

//     let privacy = await Privacy.findOne();
    
//     if (!privacy) {
//       // Create new privacy policy if none exists
//       privacy = new Privacy({
//         title: title || 'Privacy Policy',
//         content,
//         version: version || '1.0'
//       });
//     } else {
//       // Update existing privacy policy
//       privacy.title = title || privacy.title;
//       privacy.content = content;
//       privacy.version = version || privacy.version;
//     }

//     await privacy.save();

//     res.json({
//       success: true,
//       message: 'Privacy policy updated successfully',
//       privacy
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// };

// module.exports = {
//   getPrivacy,
//   updatePrivacy
// };



// Get latest Terms
const getPrivacy = async (req, res) => {
  try {
    const privacy = await Privacy.find();
    if (!privacy) {
      return res.status(400).json({
        success: false,
        message: "No Privacy & Policy found",
      });
    }
    res.status(200).json({
      success: true,
      privacy
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Save or Update Terms
const savePrivacy = async (req, res) => {
  const { content } = req.body;
  try {
    let privacy = await Privacy.findOne();
  
    if (privacy) {
      privacy.content = content;
      privacy.lastUpdated = new Date();
      await privacy.save();
    } else {
      privacy = await Privacy.create({ content });
    }
    res.status(200).json({
      success: true,
      message: "Privacy saved successfully",
      privacy,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ 
      success: false,
      message: "Server error"
    });
  }
};

module.exports = {
  getPrivacy,
  savePrivacy
};
