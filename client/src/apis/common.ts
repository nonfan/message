import request from "../utils/request";

function getCode(email: string): Promise<any> {
  return request({
    url: '/email',
    method: 'POST',
    data: {
      email,
    },
  });
}

function feedback(id: string, description: string) {
  return request({
    url: `/feedback/${id}`,
    method: "POST",
    data: {
      description
    }
  })
}

export {
  feedback, getCode
};

