const LandRouter = require("express").Router();
const Lands = require("../model/Lands.model");

const { response } = require("../utility/Response.utility");
const { logger } = require("../utility/Logger.utility");
const { uploadFile } = require("../utility/Upload.utility");

// Create a new land
LandRouter.post("/create", async (req, res) => {
    try {


        const { landId, ownerId, areaSize, citizenshipNo, description, price, city, state } = req.body;

        if (landId === "" || ownerId === "" || areaSize === "" || citizenshipNo === "" || description === "" || price === "" || city === "" || state === "") {
            return response(res, 400, "error", "All fields are required");
        }
        console.log("Creating land with data:", req.body);

        // Create a new land instance
        const newLand = new Lands({
            landId,
            ownerId,
            areaSize,
            citizenshipNo,
            description,
            price,
            city,
            state,
        });
        
        const savedNewLand = await newLand.save();
        console.log("New land instance created:", savedNewLand);
        return response(res, 201, "success", "Land created successfully", savedNewLand);
    } catch (error) {
        console.error("Error creating land:", error);
        return response(res, 500, "error", "Internal server error");
    }
});

// Get all lands
LandRouter.get("/", async (req, res) => {
    try {
        const lands = await Lands.find();
        return response(res, 200, "success", "Lands retrieved successfully", lands);
    } catch (error) {
        console.error("Error retrieving lands:", error);
        return response(res, 500, "error", "Internal server error");
    }
});

// Get all lands by owner Id
LandRouter.get("/owner/:ownerId", async (req, res) => {
    try {
        console.log("Fetching lands for ownerId:", req.params.ownerId);
        const lands = await Lands.find({ ownerId: req.params.ownerId });
        if (lands.length === 0) {
            return response(res, 404, "error", "No lands found for this owner");
        }
        return response(res, 200, "success", {message: "Lands retrieved successfully", data: lands});
    } catch (error) {
        logger.error("Error retrieving lands by owner:", error);
        return response(res, 500, "error", "Internal server error");
    }
});

// Get land by ID
LandRouter.get("/:id", async (req, res) => {
    try {
        const land = await Lands.findById(req.params.id);
        if (!land) {
            return response(res, 404, "error", "Land not found");
        }
        return response(res, 200, "success", "Land retrieved successfully", land);
    } catch (error) {
        logger.error("Error retrieving land:", error);
        return response(res, 500, "error", "Internal server error");
    }
});

// Update land by ID
LandRouter.put("/:id", async (req, res) => {
    try {
        const { name, location, size, owner } = req.body;

        if (!name || !location || !size || !owner) {
            return response(res, 400, "error", "All fields are required");
        }

        const updatedLand = await Lands.findByIdAndUpdate(
            req.params.id,
            { name, location, size, owner },
            { new: true }
        );

        if (!updatedLand) {
            return response(res, 404, "error", "Land not found");
        }

        return response(res, 200, "success", "Land updated successfully", updatedLand);
    } catch (error) {
        logger.error("Error updating land:", error);
        return response(res, 500, "error", "Internal server error");
    }
});


// Delete land by ID
LandRouter.delete("/:id", async (req, res) => {
    try {
        const deletedLand = await Lands.findByIdAndDelete(req.params.id);
        if (!deletedLand) {
            return response(res, 404, "error", "Land not found");
        }
        return response(res, 200, "success", "Land deleted successfully");
    } catch (error) {
        logger.error("Error deleting land:", error);
        return response(res, 500, "error", "Internal server error");
    }
});


module.exports = LandRouter;