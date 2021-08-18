import express from 'express';

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = null;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  next();
});

router.get('/profile', (req, res) => {
  res.render('profile', { title: '내 정보 - Nodebird' });
});

router.get('/join', (req, res) => {
  res.render('join', { title: '회원가입 - Nodebird' });
});

router.get('/', (req, res) => {
  const twits: number[] = [];
  res.render('main', {
    title: 'Nodebird',
    twits,
  });
});

export default router;
