var models = require("../config/sequelizeORM");
var api = require("../tools/common");

// Fungsi untuk menambahkan antrian
function addQueue(req, res) {
  const { child_id, posyandu_id, date_of_queue } = req.body;

  // Periksa apakah child_id sudah terdaftar dengan posyandu_id dan date_of_queue yang sama
  models.tbl_queue
    .findOne({
      where: {
        child_id: child_id,
        posyandu_id: posyandu_id,
        date_of_queue: date_of_queue,
      },
    })
    .then((existingQueue) => {
      if (existingQueue) {
        // Jika child_id sudah terdaftar, berikan respon bahwa tidak bisa mendaftar
        api.error(res, "Child already registered for the queue", 400);
      } else {
        // Jika child_id belum terdaftar, lanjutkan proses penambahan antrian
        models.tbl_queue
          .max("queue_number", {
            where: {
              posyandu_id: posyandu_id,
              date_of_queue: date_of_queue,
            },
          })
          .then((maxQueueNumber) => {
            const nextQueueNumber = maxQueueNumber ? maxQueueNumber + 1 : 1;

            models.tbl_queue
              .create({
                child_id: child_id,
                queue_number: nextQueueNumber,
                date_of_queue: date_of_queue,
                time_of_queue: req.body.time_of_queue,
                status: req.body.status,
                user_id: req.body.user_id,
                posyandu_id: posyandu_id,
              })
              .then((create) => {
                api.ok(res, create);
              })
              .catch((e) => {
                api.error(res, e, 500);
              });
          })
          .catch((e) => {
            api.error(res, e, 500);
          });
      }
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}


// Fungsi untuk mendapatkan daftar antrian
function getQueues(req, res) {
  models.tbl_queue
    .findAll({
      include: [
        {
          model: models.tbl_children,
          attributes: ["name", "child_id"],
          as: "child",
        },
        {
          model: models.tbl_users,
          attributes: ["name", "user_id"],
          as: "user",
        },
        {
          model: models.tbl_posyandu,
          attributes: ["posyandu_name", "posyandu_id", "posyandu_address"],
          as: "posyandu",
        },
      ],
    })
    .then((data) => {
      if (data.length > 0) {
        const queues = data.map((queue) => ({
          ...queue.toJSON(),
          child_id: queue.child ? queue.child.child_id : null,
          user_id: queue.user ? queue.user.user_id : null,
          posyandu_id: queue.posyandu ? queue.posyandu.posyandu_id : null,
        }));
        api.ok(res, queues);
      } else {
        api.error(res, "Record not found", 200);
      }
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}


// Fungsi untuk mendapatkan detail antrian berdasarkan ID
function getQueueById(req, res) {
  models.tbl_queue
    .findOne({
      where: {
        queue_id: req.params.id,
      },
      include: [
        {
          model: models.tbl_children,
          attributes: ["name", "child_id"],
          as: "child",
        },
        {
          model: models.tbl_users,
          attributes: ["name", "user_id"],
          as: "user",
        },
        {
          model: models.tbl_posyandu,
          attributes: ["posyandu_name", "posyandu_id"],
          as: "posyandu",
        },
      ],
    })
    .then((data) => {
      if (data) {
        const queue = {
          ...data.toJSON(),
          child_id: data.child ? data.child.child_id : null,
          user_id: data.user ? data.user.user_id : null,
          posyandu_id: data.posyandu ? data.posyandu.posyandu_id : null,
        };
        api.ok(res, queue);
      } else {
        api.error(res, "Record not found", 200);
      }
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

// Fungsi untuk mendapatkan detail antrian berdasarkan ID User
function getQueueByUserId(req, res) {
  models.tbl_queue
    .findAll({
      where: {
        user_id: req.params.id,
      },
      include: [
        {
          model: models.tbl_children,
          attributes: ["name", "child_id"],
          as: "child",
        },
        {
          model: models.tbl_users,
          attributes: ["name", "user_id"],
          as: "user",
        },
        {
          model: models.tbl_posyandu,
          attributes: ["posyandu_name", "posyandu_id"],
          as: "posyandu",
        },
      ],
    })
    .then((data) => {
      if (data.length > 0) {
        const queues = data.map((queue) => ({
          ...queue.toJSON(),
          child_id: queue.child ? queue.child.child_id : null,
          user_id: queue.user ? queue.user.user_id : null,
          posyandu_id: queue.posyandu ? queue.posyandu.posyandu_id : null,
        }));
        api.ok(res, queues);
      } else {
        api.error(res, "Record not found", 200);
      }
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}


// Fungsi untuk mendapatkan detail antrian berdasarkan ID Posyandu
function getQueueByPosyanduId(req, res) {
  models.tbl_queue
    .findOne({
      where: {
        posyandu_id: req.params.id,
      },
      include: [
        {
          model: models.tbl_children,
          attributes: ["name", "child_id"],
          as: "child",
        },
        {
          model: models.tbl_users,
          attributes: ["name", "user_id"],
          as: "user",
        },
        {
          model: models.tbl_posyandu,
          attributes: ["posyandu_name", "posyandu_id"],
          as: "posyandu",
        },
      ],
    })
    .then((data) => {
      if (data) {
        const queue = {
          ...data.toJSON(),
          child_id: data.child ? data.child.child_id : null,
          user_id: data.user ? data.user.user_id : null,
          posyandu_id: data.posyandu ? data.posyandu.posyandu_id : null,
        };
        api.ok(res, queue);
      } else {
        api.error(res, "Record not found", 200);
      }
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

// Fungsi untuk mengupdate data antrian
function updateQueue(req, res) {
  models.tbl_queue
    .update(
      {
        status: req.body.status,
      },
      {
        where: { queue_id: req.params.id },
      }
    )
    .then((data) => {
      api.ok(res, data);
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

// Fungsi untuk menghapus data antrian
function deleteQueue(req, res) {
  models.tbl_queue
    .destroy({
      where: {
        queue_id: req.params.id,
      },
    })
    .then((deleteRecord) => {
      if (deleteRecord === 1) {
        api.ok(res, deleteRecord);
      } else {
        api.error(res, "Record not found", 200);
      }
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}

function getCurrentQueuesByPosyanduId(req, res) {
  const { posyanduId } = req.params;
  const posyanduIds = Array.from(Array(10).keys()).map((num) => num + 1);

  if (!posyanduIds.includes(Number(posyanduId))) {
    return api.error(res, 'Invalid posyandu ID', 400);
  }

  const currentDate = new Date();

  models.Queue.findAll({
    where: {
      posyandu_id: posyanduId,
      date_of_queue: {
        [models.Sequelize.Op.eq]: currentDate,
      },
    },
    include: [
      {
        model: models.Posyandu,
        as: 'posyandu',
      },
    ],
  })
    .then((data) => {
      if (data.length === 0) {
        api.ok(res, null);
      } else {
        api.ok(res, data);
      }
    })
    .catch((e) => {
      api.error(res, e, 500);
    });
}


module.exports = {
  addQueue,
  getQueues,
  getQueueById,
  updateQueue,
  deleteQueue,
  getQueueByPosyanduId,
  getQueueByUserId,  
};
