import * as AuthService from "../services/authService.js";
export const registerStudent = async (req, res) => {
    const {firstName, lastName, birthdate, course, major, address, studentStatus} = req.body;
    try{
        const studentProfile = {
            firstName, lastName, birthdate, course, major, address, studentStatus
        }
        const result = await AuthService.registerStudent(studentProfile);
        res.status(201).json({
            success: true,
            message: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occured while registering the student."
        });
    }
}