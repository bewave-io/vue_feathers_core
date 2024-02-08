// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from "@feathersjs/schema";
import {
    type Static,
    Type,
    getValidator,
    querySyntax,
} from "@feathersjs/typebox";
import { ObjectIdSchema } from "@feathersjs/typebox";
import type { HookContext } from "../../declarations";
import { dataValidator, queryValidator } from "../../validators";
import type { TaskService } from "./tasks.class";


const incidentDataSchema= Type.Object(
    {
        type: Type.Literal("incident"),
        incidentDate: Type.Number(),
    },
    { additionalProperties: false },
);
export type IncidentData = Static<typeof incidentDataSchema>;

const otherDatasSchema = Type.Object(
    {
        type: Type.Literal("other"),
        comment: Type.String(),
    },
    { additionalProperties: false },
);
export type OtherData = Static<typeof incidentDataSchema>;

export const taskSchema = Type.Object(
    {
        _id: ObjectIdSchema(),
        name: Type.String(),
        data: Type.Union([
            incidentDataSchema,
            otherDatasSchema,
        ]),
    },
    { $id: "Task", additionalProperties: false },
);

export type Task = Static<typeof taskSchema>;

export const taskValidator = getValidator(taskSchema, dataValidator);
export const taskResolver = resolve<Task, HookContext<TaskService>>({});

export const taskExternalResolver = resolve<Task, HookContext<TaskService>>({});

// Schema for creating new entries
export const taskDataSchema = Type.Pick(taskSchema, ["name", "data"], {
    $id: "TaskData",
});
export type TaskData = Static<typeof taskDataSchema>;
export const taskDataValidator = getValidator(taskDataSchema, dataValidator);
export const taskDataResolver = resolve<Task, HookContext<TaskService>>({});

// Schema for updating existing entries
export const taskPatchSchema = Type.Partial(taskSchema, {
    $id: "TaskPatch",
});
export type TaskPatch = Static<typeof taskPatchSchema>;
export const taskPatchValidator = getValidator(taskPatchSchema, dataValidator);
export const taskPatchResolver = resolve<Task, HookContext<TaskService>>({});

// Schema for allowed query properties
export const taskQueryProperties = taskSchema;
export const taskQuerySchema = Type.Intersect(
    [
        querySyntax(taskQueryProperties),
        // Add additional query properties here
        Type.Object(
            {
                "data.type": Type.Optional(
                    Type.Union([
                        Type.Literal("incident"),
                        Type.Literal("other"),
                    ]),
                ),
            },
            { additionalProperties: false },
        ),
    ],
    { additionalProperties: false },
);
export type TaskQuery = Static<typeof taskQuerySchema>;
export const taskQueryValidator = getValidator(taskQuerySchema, queryValidator);
export const taskQueryResolver = resolve<TaskQuery, HookContext<TaskService>>(
    {},
);
