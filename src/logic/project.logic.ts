import { Request, Response } from "express";
import { QueryConfig } from "pg";
import format from "pg-format";
import { client } from "../database";
import { ProjResult } from "../interfaces/projects.interfaces";

export const createProject = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const projKeys: string[] = Object.keys(request.proj);
  const projValues: string[] = Object.values(request.proj);

  const queryTemp: string = format(
    `
    INSERT INTO
        projects(%I)
    VALUES
        (%L)
    RETURNING *;
  `,
    projKeys,
    projValues
  );

  const queryResult: ProjResult = await client.query(queryTemp);
  return response.status(201).json(queryResult.rows[0]);
};

export const listAllProjs = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const queryString: string = `
    SELECT 
        pj."id" AS "projectID", pj."name" AS "projectName", pj."description" AS "projectDescription", pj."estimatedTime" AS "projectEstimatedTime", pj."repository" AS "projectRepository", pj."startDate" AS "projectStartDate", pj."endDate" AS "projectEndDate", pj."developerId" AS "projectDeveloperID", tech."id" AS "technologyID", tech."name" AS "technologyName"
    FROM 
        projects pj
    LEFT JOIN
        projects_technologies pt
    ON 
        pt."projectID" = pj."id"
    LEFT JOIN
        technologies tech
    ON
        pt."techID" = tech."id";`;

  const queryResult = await client.query(queryString);
  return response.json(queryResult.rows);
};

export const listAProj = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const id = parseInt(request.params.id);
  const queryString: string = `
    SELECT 
        pj."id" AS "projectID", pj."name" AS "projectName", pj."description" AS "projectDescription", pj."estimatedTime" AS "projectEstimatedTime", pj."repository" AS "projectRepository", pj."startDate" AS "projectStartDate", pj."endDate" AS "projectEndDate", pj."developerId" AS "projectDeveloperID", tech."id" AS "technologyID", tech."name" AS "technologyName"
    FROM 
        projects pj
    LEFT JOIN
        projects_technologies pt
    ON 
        pt."projectID" = pj."id"
    LEFT JOIN
        technologies tech
    ON
        pt."techID" = tech."id"
    WHERE
        pt."id" = $1;`;

  const queryConfig: QueryConfig = { text: queryString, values: [id] };

  const queryResult = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    return response.status(404).json({
      message: "No projects found",
    });
  }
  return response.json(queryResult.rows);
};

export const updateProject = async (
  request: Request,
  response: Response
): Promise<Response> => {
  return response.json();
};