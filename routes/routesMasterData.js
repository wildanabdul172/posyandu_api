var express = require('express');
var MasterDataCtrl = require('../controllers/MasterData.controller');
var QueueCtrl = require('../controllers/Queue.controller');
var router = express.Router();
const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/');
    },
    filename: (req, file, cb) => {
      cb(null,  file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({ storage: fileStorage, fileFilter: fileFilter }).single('image');

// Users

router.post('/users', MasterDataCtrl.add_users);
router.get('/users', MasterDataCtrl.get_users);
router.get('/users/:id', MasterDataCtrl.get_usersById);
router.put('/users/:id', MasterDataCtrl.update_users);
router.delete('/users/:id', MasterDataCtrl.delete_users);

// Activities

router.post('/activities', MasterDataCtrl.add_activities);
router.get('/activities', MasterDataCtrl.get_activities);
router.get('/activities/:id', MasterDataCtrl.get_activitiesById);
router.put('/activities/:id', MasterDataCtrl.update_activities);
router.delete('/activities/:id', MasterDataCtrl.delete_activities);

// Children

router.post('/children', MasterDataCtrl.add_children);
router.get('/children', MasterDataCtrl.get_children);
router.get('/children/:id', MasterDataCtrl.get_childrenById);
router.get('/users/:user_id/children', MasterDataCtrl.get_childrenByUserId);
router.put('/children/:id', MasterDataCtrl.update_children);
router.delete('/children/:id', MasterDataCtrl.delete_children);

// Articles

router.post('/articles', upload, MasterDataCtrl.add_articles);
router.get('/articles', MasterDataCtrl.get_articles);
router.get('/articles/:id', MasterDataCtrl.get_articlesById);
router.put('/articles/:id', MasterDataCtrl.update_articles);
router.delete('/articles/:id', MasterDataCtrl.delete_articles);

// Health Records

router.post('/children/:id/healthRecords', MasterDataCtrl.add_healthRecords);
router.get('/healthRecords', MasterDataCtrl.get_healthRecords);
router.get('/children/:id/healthRecords', MasterDataCtrl.get_recordsByChildren);
router.get('/healthRecords/:id', MasterDataCtrl.get_healthRecordsById);
router.put('/healthRecords/:id', MasterDataCtrl.update_healthRecords);
router.delete('/healthRecords/:id', MasterDataCtrl.delete_healthRecords);

// Posyandu

router.get('/posyandu', MasterDataCtrl.get_posyandu);
router.get('/posyandu/:id', MasterDataCtrl.get_posyanduById);

// Antrian

router.post('/queue', QueueCtrl.addQueue);
router.get('/queue', QueueCtrl.getQueues);
router.get('/queue/:id', QueueCtrl.getQueueById);
router.get('/users/:id/queue', QueueCtrl.getQueueByUserId);
router.get('/posyandu/:id/queue', QueueCtrl.getQueueByPosyanduId);
router.put('/queue/:id', QueueCtrl.updateQueue);
router.delete('/queue/:id', QueueCtrl.deleteQueue);

module.exports = router;