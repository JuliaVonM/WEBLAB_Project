import {Request, Response} from "express";
import {Technology} from "../models/technology.model";

// Create a technology
export const createTechnology = (req: Request, res: Response): void => {
    const {name, description, category, ring, description_ring, published} = req.body;

    if (!name || !description || !category) {
        res.status(400).json({message: 'All required fields must be filled in!'});
        return;
    }

    const date = new Date();

    const newTechnology = new Technology({
        name,
        category,
        description,
        published,
        createdAt: date
    });

    if (ring != undefined && description_ring != undefined) {
        newTechnology.ring = ring;
        newTechnology.description_ring = description_ring;
    }

    if (published) {
        newTechnology.publicationDate = date;
    }

    newTechnology.save()
    .then((technology) => {
        res.status(201).json({message: 'Technology successfully created', technology});
    })
    .catch((err) => {
        res.status(500).json({message: 'Error when creating technology', error: err});
    });
};

// Get all technologies
export const getTechnologies = (req: Request, res: Response) => {
    const filter = req.query.published ? { published: 'true' } : {};

    Technology.find(filter)
    .then((technologies) => res.json(technologies))
    .catch((error) => res.status(500).json({ message: "Server error", error }));
};

// Get a single technologies by ID
export const getTechnologyById = (req: Request, res: Response) => {
    Technology.findById(req.params.id)
    .then((technology) => {
        if (!technology) {
            return res.status(404).json({message: "Technology not found"});
        }
        res.json(technology);
    })
    .catch((error) => res.status(500).json({message: "Server error", error}));
};

// Update technology
export const updateTechnology = (req: Request, res: Response): void => {
    const technologyId = req.params.id;
    const {name, category, description, ring, description_ring, published} = req.body;

    Technology.findById(technologyId)
    .then((technology) => {
        if (!technology) {
            res.status(404).json({message: 'Technology not found'});
            return;
        }

        if (name) technology.name = name;
        if (category) technology.category = category;
        if (description) technology.description = description;

        if (ring !== undefined && description_ring !== undefined) {
            technology.ring = ring;
            technology.description_ring = description_ring;
        }

        if (published !== undefined) {
            if (published && (!ring || !description_ring)) {
                return res.status(400).json({message: 'Ring and ring description are required to publish a technology.'});
            }
            technology.published = published;
            if (published) technology.publicationDate = new Date();
        }

        technology.updatedAt = new Date();

        technology.save()
        .then((updatedTechnology) => {
            res.status(200).json({message: 'Technology successfully updated', updatedTechnology});
        })
        .catch((err: any) => {
            res.status(500).json({message: 'Error when updating the technology', error: err});
        });
    })
    .catch((err: any) => {
        res.status(500).json({message: 'Error when retrieving the technology', error: err});
    });
};

// Delete technology
export const deleteTechnology = (req: Request, res: Response) => {
    const technologyId = req.params.id;

    Technology.findByIdAndDelete(technologyId)
    .then((deletedTechnology) => {
        if (!deletedTechnology) {
            return res.status(404).json({message: "Technology not found"});
        }
        res.json({message: "Technology deleted successfully"});
    })
    .catch((error) => {
        res.status(500).json({message: "Server error", error});
    });
};
