export const approveUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        // Update user status to approved
        user.status = 'approved';
        await user.save();

        res.status(200).json({
            success: true,
            message: "User approved successfully!",
        });
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler(error.message, error.statusCode));
    }
};

export const rejectUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        // Update user status to rejected
        user.status = 'rejected';
        await user.save();

        res.status(200).json({
            success: true,
            message: "User rejected successfully!",
        });
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler(error.message, error.statusCode));
    }
};