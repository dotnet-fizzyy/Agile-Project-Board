export const ColumnIds = {
    IDEA: 'IDEA',
    TODO: 'TODO',
    PROGRESS: 'PROGRESS',
    REVIEW: 'REVIEW',
    ACCEPTED: 'ACCEPTED',
};

export const ColumnNames = {
    [ColumnIds.IDEA]: 'Idea',
    [ColumnIds.TODO]: 'TODO',
    [ColumnIds.PROGRESS]: 'Progress',
    [ColumnIds.REVIEW]: 'Review',
    [ColumnIds.ACCEPTED]: 'Accepted',
};

export const UserRoles = {
    CUSTOMER: 'Customer',
    ENGINEER: 'Engineer',
    TEAMMASTER: 'TeamMaster',
};

export const enum ModalCreationType {
    Project,
    Epic,
    Sprint,
}
