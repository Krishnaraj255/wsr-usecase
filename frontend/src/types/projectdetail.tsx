type projectDetail = {
    projectId: string,
    projectName: string;
    resources: object;
    sprint: projectStatus[];
    createdAt: string;
};

type ResourcesType = {
    [role: string]: {
        [employee: string]: string | number;
    }
}

type Emp = {
    role: string,
    employee: string
}

type projectStatus = {
    projectname: string;
    sprintNo: number | null;
    sprintGoal: string;
    startDate: string | null;
    endDate: string | null;
    accomplishment: string;
    risk: string;
    commitedStoryPoints: string;
    deliveredStoryPoints: string;
    velocity: number | null;
    status: string;
    resources: ResourcesType;
}

export type { projectDetail, projectStatus, ResourcesType,Emp };
