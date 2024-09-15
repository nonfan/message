import { CommonController } from '../controllers/CommonController';

export const CommonRoute = [
  {
    method: "get",
    route: "/image",
    controller: CommonController,
    action: "getImage"
  },
  {
    method: "post",
    route: "/feedback/:id",
    controller: CommonController,
    action: "feedback"
  },
  {
    method: "get",
    route: "/feedback-list",
    controller: CommonController,
    action: "getFeedbackList"
  }
];
