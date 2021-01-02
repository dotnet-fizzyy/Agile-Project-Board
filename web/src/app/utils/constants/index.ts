import { ComponentType } from '@angular/cdk/overlay';
import { EpicCreationComponent } from '../../components/modals/epic-creation/epic-creation.component';
import { ProjectCreationComponent } from '../../components/modals/project-creation/project-creation.component';
import { SprintCreationComponent } from '../../components/modals/sprint-creation/sprint-creation.component';
import { TeamManageComponent } from '../../components/modals/team-manage/team-manage.component';
import { UserCreationComponent } from '../../components/modals/user-creation/user-creation.component';

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
    Customer: 'Customer',
    Engineer: 'Engineer',
    TeamMaster: 'TeamMaster',
};

export const enum ModalType {
    CREATE,
    UPDATE,
}

export type ModalComponentTypes = ComponentType<
    | EpicCreationComponent
    | SprintCreationComponent
    | ProjectCreationComponent
    | TeamManageComponent
    | UserCreationComponent
>;
