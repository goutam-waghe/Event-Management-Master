//list of user
export const manageUsers = async function (req, res, next) {
  try {
    const response = await manageUsersService();
    return res.status(response.code).json(response);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error ${error}`,
    });
  }
};

//change role
export const updateRole = async function (req, res, next) {
  try {
    const userId = req.params.id;
    const { role } = req.body;
    const response = await updateRoleService({ userId, role });
    return res.status(response.code).json(response);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error ${error}`,
    });
  }
};
