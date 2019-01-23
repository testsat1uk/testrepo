const endpoints = {
  project: (client, dashboard) =>
    `v1/clients/${client}/project/${dashboard}`,
  hub: client =>
    `v1/clients/${client}/dashboards`,
  filters: (client, dashboard) =>
    `v1/clients/${client}/dashboards/${dashboard}/filters`,
  tags: (client, dashboard) =>
    `v1/clients/${client}/dashboards/${dashboard}/tags`,
  image: (client, dashboard, id) =>
    `v1/clients/${client}/dashboards/${dashboard}/images/${id}`,
  images: (client, dashboard) =>
    `v1/clients/${client}/dashboards/${dashboard}/images`,
  video: (client, dashboard, id) =>
    `v1/clients/${client}/dashboards/${dashboard}/videos/${id}`,
  videos: (client, dashboard) =>
    `v1/clients/${client}/dashboards/${dashboard}/videos`,
  data: (client, dashboard) =>
    `v1/clients/${client}/dashboards/${dashboard}/data`,
  summary: (client, dashboard) =>
    `v1/clients/${client}/dashboards/${dashboard}/summary`,
  widget: (client, dashboard, id) =>
    `v1/clients/${client}/dashboards/${dashboard}/data/widgets/${id}`,
  survey: (client, dashboard, survey) =>
    `v1/clients/${client}/dashboards/${dashboard}/surveys/${survey}`,
  download: (client, dashboard) =>
    `v1/clients/${client}/dashboards/${dashboard}/download`,
  login: (client, dashboard) =>
    `v1/clients/${client}/project/${dashboard}/login`,
  client_login: () => 'v1/login',
  sign_up: (client, dashboard) =>
    `v1/clients/${client}/dashboards/${dashboard}/sign_up`,
  password_recover: (client, dashboard) =>
    `v1/clients/${client}/dashboards/${dashboard}/recover_password`,
  change_password: (client, dashboard, token) =>
    `v1/clients/${client}/dashboards/${dashboard}/recover_password/${token}/change_password`,
  token_expired: (client, dashboard, token) =>
    `v1/clients/${client}/dashboards/${dashboard}/recover_password/${token}/expired`,
  forget_token: (client, dashboard, token) =>
    `v1/clients/${client}/dashboards/${dashboard}/recover_password/${token}/forget`,
  allowed_domains: (client, dashboard) =>
    `v1/clients/${client}/dashboards/${dashboard}/allowed_domains`,
  confirm: () => 'v1/users/confirm',
  contact: (client, dashboard) =>
    `v1/clients/${client}/dashboards/${dashboard}/contact`,
}

export default endpoints