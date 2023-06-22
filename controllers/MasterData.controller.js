var models = require("../config/sequelizeORM");
var api = require("../tools/common");
const moment = require("moment-timezone");

//Users

function add_users(req, res) {
  models.tbl_users
    .create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      phone_number: req.body.phone_number,
      role: req.body.role,
    })
    .then(function (create) {
      api.ok(res, create);
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

function get_users(req, res) {
  models.tbl_users
    .findAll()
    .then((data) => {
      if (data.length > 0) {
        api.ok(res, data);
      } else {
        api.error(res, "Record not found", 200);
      }
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

function get_usersById(req, res) {
  models.tbl_users
    .findAll({
      where: {
        user_id: req.params.id,
      },
    })
    .then((data) => {
      if (data.length > 0) {
        api.ok(res, data);
      } else {
        api.error(res, "Record Not Found", 200);
      }
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

function update_users(req, res) {
  models.tbl_users
    .update(
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        phone_number: req.body.phone_number,
        role: req.body.role,
      },
      {
        where: { user_id: req.params.id },
      }
    )
    .then((data) => {
      api.ok(res, data);
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

function delete_users(req, res) {
  models.tbl_users
    .destroy({
      where: {
        user_id: req.params.id,
      },
    })
    .then(function (deleteRecord) {
      if (deleteRecord === 1) {
        api.ok(res, deleteRecord);
      } else {
        api.error(res, "Record Not Found", 200);
      }
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

//Activities

function add_activities(req, res) {
  models.tbl_activities
    .create({
      activity_name: req.body.activity_name,
      activity_date: req.body.activity_date,
      activity_time: req.body.activity_time,
      activity_location: req.body.activity_location,
    })
    .then(function (create) {
      api.ok(res, create);
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}


function get_activities(req, res) {
  models.tbl_activities
    .findAll({
      include: [
        {
          model: models.tbl_posyandu,
          attributes: ['posyandu_name', 'posyandu_id'],
          as: 'posyandu',
        },
      ],
    })
    .then((data) => {
      console.log(data);
      if (data.length > 0) {
        const activities = data.map(activity => ({
          ...activity.toJSON(),
          activity_location: activity.posyandu ? activity.posyandu.posyandu_id : null,
        }));
        api.ok(res, activities);
      } else {
        api.error(res, "Record not found", 200);
      }
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}



function get_activitiesById(req, res) {
  models.tbl_activities
    .findAll({
      where: {
        activity_id: req.params.id,
      },
    })
    .then((data) => {
      if (data.length > 0) {
        api.ok(res, data);
      } else {
        api.error(res, "Record Not Found", 200);
      }
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

function update_activities(req, res) {
  models.tbl_activities
    .update(
      {
        activity_name: req.body.activity_name,
        activity_date: req.body.activity_date,
        activity_time: req.body.activity_time,
        activity_location: req.body.activity_location,
      },
      {
        where: { activity_id: req.params.id },
      }
    )
    .then((data) => {
      api.ok(res, data);
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

function delete_activities(req, res) {
  models.tbl_activities
    .destroy({
      where: {
        activity_id: req.params.id,
      },
    })
    .then(function (deleteRecord) {
      if (deleteRecord === 1) {
        api.ok(res, deleteRecord);
      } else {
        api.error(res, "Record Not Found", 200);
      }
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

// Children

function add_children(req, res) {
  models.tbl_children
    .create({
      name: req.body.name,
      date_of_birth: req.body.date_of_birth,
      gender: req.body.gender,
      address: req.body.address,
      parent_phone_number: req.body.parent_phone_number,
      parent_name: req.body.parent_name,
      user_id: req.body.user_id,
    })
    .then(function (create) {
      api.ok(res, create);
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

function get_children(req, res) {
  models.tbl_children
    .findAll()
    .then((data) => {
      if (data.length > 0) {
        api.ok(res, data);
      } else {
        api.error(res, "Record not found", 200);
      }
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

function get_childrenById(req, res) {
  models.tbl_children
    .findAll({
      where: {
        child_id : req.params.id,
      },
    })
    .then((data) => {
      if (data.length > 0) {
        api.ok(res, data);
      } else {
        api.error(res, "Record Not Found", 200);
      }
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

function update_children(req, res) {
  models.tbl_children
    .update(
      {
        name: req.body.name,
        date_of_birth: req.body.date_of_birth,
        gender: req.body.gender,
        address: req.body.address,
        parent_phone_number: req.body.parent_phone_number,
        parent_name: req.body.parent_name,
      },
      {
        where: { child_id : req.params.id },
      }
    )
    .then((data) => {
      api.ok(res, data);
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

function delete_children(req, res) {
  models.tbl_children
    .destroy({
      where: {
        child_id : req.params.id,
      },
    })
    .then(function (deleteRecord) {
      if (deleteRecord === 1) {
        api.ok(res, deleteRecord);
      } else {
        api.error(res, "Record Not Found", 200);
      }
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

// Articles

function add_articles(req, res) {
  models.tbl_articles
    .create({
      title: req.body.title,
      content: req.body.content,
      create_at: req.body.create_at,
      image: req.file.filename,
    })
    .then(function (create) {
      api.ok(res, create);
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

function get_articles(req, res) {
  models.tbl_articles
    .findAll()
    .then((data) => {
      if (data.length > 0) {
        api.ok(res, data);
      } else {
        api.error(res, "Record not found", 200);
      }
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

function get_articlesById(req, res) {
  models.tbl_articles
    .findAll({
      where: {
        id: req.params.id,
      },
    })
    .then((data) => {
      if (data.length > 0) {
        api.ok(res, data);
      } else {
        api.error(res, "Record Not Found", 200);
      }
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

function update_articles(req, res) {
  models.tbl_articles
    .update(
      {
        title: req.body.title,
        content: req.body.content,
        create_at: req.body.create_at,
      },
      {
        where: { id: req.params.id }
      }
    )
    .then((data) => {
      api.ok(res, data);
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

function delete_articles(req, res) {
  models.tbl_articles
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then(function (deleteRecord) {
      if (deleteRecord === 1) {
        api.ok(res, deleteRecord);
      } else {
        api.error(res, "Record Not Found", 200);
      }
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

// Health Records

function add_healthRecords(req, res) {
  models.tbl_children
    .findOne({
      where: {
        child_id: req.params.id,
      },
    })
    .then((child) => {
      if (child) {
        const { weight, height, date_of_record, head_circumference, arm_circumference, immunization } = req.body;

        models.tbl_healthrecords
          .create({
            child_id: child.child_id,
            weight: weight,
            height: height,
            date_of_record: date_of_record,
            head_circumference: head_circumference,
            arm_circumference: arm_circumference,
            immunization: immunization
          })
          .then((healthRecord) => {
            api.ok(res, healthRecord);
          })
          .catch((e) => {
            api.error(res, e, 500);
          });
      } else {
        api.error(res, "Child Not Found", 404);
      }
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

function get_recordsByChildren(req, res) {
  models.tbl_children
    .findOne({
      where: {
        child_id: req.params.id,
      },
    })
    .then((child) => {
      if (child) {
        models.tbl_healthrecords
          .findAll({
            where: {
              child_id: child.child_id,
            },
          })
          .then((healthRecords) => {
            api.ok(res, healthRecords);
          })
          .catch((e) => {
            api.error(res, e, 500);
          });
      } else {
        api.error(res, "Child Not Found", 404);
      }
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

function get_healthRecords(req, res) {
  models.tbl_healthrecords
    .findAll()
    .then((data) => {
      if (data.length > 0) {
        api.ok(res, data);
      } else {
        api.error(res, "Record not found", 200);
      }
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

function get_healthRecordsById(req, res) {
  models.tbl_healthrecords
    .findAll({
      where: {
        id: req.params.id,
      },
    })
    .then((data) => {
      if (data.length > 0) {
        api.ok(res, data);
      } else {
        api.error(res, "Record Not Found", 200);
      }
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

function update_healthRecords(req, res) {
  models.tbl_healthrecords
    .update(
      {
        child_id: req.body.child_id,
        weight: req.body.weight,
        height: req.body.height,
        date_of_record: req.body.date_of_record,
        head_circumference: req.body.head_circumference,
        arm_circumference: req.body.arm_circumference,
      },
      {
        where: { id: req.params.id },
      }
    )
    .then((data) => {
      api.ok(res, data);
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

function delete_healthRecords(req, res) {
  models.tbl_healthrecords
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then(function (deleteRecord) {
      if (deleteRecord === 1) {
        api.ok(res, deleteRecord);
      } else {
        api.error(res, "Record Not Found", 200);
      }
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

// Posyandu

function get_posyandu(req, res) {
  models.tbl_posyandu
    .findAll()
    .then((data) => {
      console.log(data)
      if (data.length > 0) {
        api.ok(res, data);
      } else {
        api.error(res, "Record not found", 200);
      }
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

function get_posyanduById(req, res) {
  models.tbl_posyandu
    .findAll({
      where: {
        posyandu_id: req.params.id,
      },
    })
    .then((data) => {
      if (data.length > 0) {
        api.ok(res, data);
      } else {
        api.error(res, "Record Not Found", 200);
      }
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

module.exports = {
  add_users,
  get_users,
  get_usersById,
  update_users,
  delete_users,
  add_activities,
  get_activities,
  get_activitiesById,
  update_activities,
  delete_activities,
  add_children,
  get_children,
  get_childrenById,
  update_children,
  delete_children,
  add_articles,
  get_articles,
  get_articlesById,
  update_articles,
  delete_articles,
  add_healthRecords,
  get_recordsByChildren,
  get_healthRecords,
  get_healthRecordsById,
  update_healthRecords,
  delete_healthRecords,
  get_posyandu,
  get_posyanduById,
};
