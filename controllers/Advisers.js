const Entity = require("../models/Advisers"),
  Users = require("../models/Users"),
  Sections = require("../models/Resources/Sections"),
  handleQuery = require("../config/query");

exports.save = async (req, res) => {
  const { user, adviser } = req.body;
  let _user = undefined;

  if (user) {
    _user = await Users.findByIdAndUpdate(adviser.user, user, {
      new: true,
    }).select("-password");
  }

  Entity.create(adviser)
    .then((_adviser) => {
      var success =
        "The form has been submitted; please await validation by the COORDINATOR.";

      if (!adviser.isPublished) success = "Form draft saved.";

      res.status(201).json({
        success,
        payload: {
          user: _user,
          adviser: _adviser,
        },
      });
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.update = async (req, res) => {
  const { user, adviser, didUpdate = false } = req.body;
  let _user = undefined;

  if (user) {
    _user = await Users.findByIdAndUpdate(adviser.user, user, {
      new: true,
    }).select("-password");
  }

  Entity.findByIdAndUpdate(adviser._id, adviser, { new: true })
    .populate({
      path: "user",
      select: "fullName",
    })
    .then((_adviser) => {
      var success =
        "The form has been submitted; please await validation by the coordinator.";

      if (!adviser.isPublished) success = "Form draft updated.";

      let shouldRefresh = false;

      // coordinator chooses to approve one of these roles
      if (
        adviser.status === "approved" &&
        ["HEAD", "MASTER", "VICE"].includes(adviser.access)
      ) {
        shouldRefresh = true;
      }

      res.json({
        success,
        payload: {
          user: _user,
          adviser: _adviser,
        },
        didUpdate,
        shouldRefresh,
      });
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.browse = (req, res) => {
  Entity.find()
    .bySchool(req.query.school)
    .populate({
      path: "user",
      select:
        "mobile fullName motherTongue dob pob civilStatus isMale address email",
    })
    .sort({ createdAt: -1 })
    .lean()
    .then((advisers) => {
      console.log(advisers);
      res.json({
        success: "Advisers Fetched Successfully.",
        payload: advisers,
        taken: "ADVISERS",
      });
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.advisers = (req, res) => {
  const { department } = req.query;

  if (!department)
    return res.status(400).json({
      error: "Invalid Parameters",
      message: "Department is required.",
    });

  Entity.find({
    status: "approved",
    access: "ADVISER",
    department,
  })
    .populate({
      path: "user",
      select: "fullName",
    })
    .select("user")
    .sort({ createdAt: -1 })
    .lean()
    .then((advisers) =>
      res.json({
        success: "Teachers Found successfully.",
        payload: advisers.map((teach) => ({
          ...teach,
          user: teach.user.fullName,
        })),
      })
    )
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.faculty = (req, res) => {
  const { department } = req.query;

  if (!department)
    return res.status(400).json({
      error: "Invalid Parameters",
      message: "Department is required.",
    });

  Entity.find({
    department,
    status: "approved",
  })
    .populate({
      path: "user",
      select: "fullName",
    })
    .select("user access")
    .sort({ createdAt: -1 })
    .lean()
    .then(async (payload) => {
      const advisers = [];

      for (const teach of payload.filter(
        ({ access }) => access === "ADVISER"
      )) {
        let section = undefined;

        const _section = await Sections.findOne({ adviser: teach._id });

        if (_section) section = _section.name;

        advisers.push({
          ...teach,
          user: teach?.user?.fullName,
          section,
        });
      }

      res.json({
        success: "Faculty Found successfully.",
        payload: advisers,
      });
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.employees = (req, res) =>
  Entity.find(handleQuery(req.query))
    .populate({
      path: "user",
      select: "fullName",
    })
    .sort({ createdAt: -1 })
    .lean()
    .then((payload) =>
      res.json({
        success: "Employees Fetched Successfully.",
        payload,
      })
    )
    .catch((error) => res.status(400).json({ error: error.message }));
