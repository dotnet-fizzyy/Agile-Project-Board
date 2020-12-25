import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ProjectActions from 'src/app/redux/actions/project.actions';
import { IProjectState } from '../../../redux/store/state';
import { ModalCreationType } from '../../../utils/constants';
import { nameof } from '../../../utils/helpers/index';
import { IEpic, IProject, ISprint } from '../../../utils/interfaces/index';

export default abstract class BaseModalCreation {
    readonly label: string;
    readonly name: string;
    readonly startDate: string = 'startDate';
    readonly endDate: string = 'endDate';

    constructor(private modalType: ModalCreationType, private fb: FormBuilder, private store$: Store<IProjectState>) {
        this.label = this.getLabel(modalType);
        this.name = this.getName(modalType);
        this.formGroup = this.fb.group({
            [this.name]: ['', Validators.required],
            [this.startDate]: ['', Validators.required],
            [this.endDate]: ['', Validators.required],
        });
    }

    public formGroup: FormGroup;

    public onClickCreate = () => {
        const dates = {
            startDate: this.formGroup.get(this.startDate).value,
            endDate: this.formGroup.get(this.endDate).value,
        };

        switch (this.modalType) {
            case ModalCreationType.Project:
                const project: IProject = {
                    ...dates,
                    projectName: this.formGroup.get(this.name).value,
                };
                this.store$.dispatch(new ProjectActions.CreateProjectRequest(project));
                break;
            case ModalCreationType.Sprint:
                const sprint: ISprint = {
                    ...dates,
                    sprintName: this.formGroup.get(this.name).value,
                };
                this.store$.dispatch(new ProjectActions.CreateProjectRequest(sprint as any));
                break;
            case ModalCreationType.Epic:
                const epic: IEpic = {
                    ...dates,
                    epicName: this.formGroup.get(this.name).value,
                };
                this.store$.dispatch(new ProjectActions.CreateProjectRequest(epic as any));
                break;
            default:
                break;
        }
    };

    private getName = (modalType: ModalCreationType): string => {
        switch (modalType) {
            case ModalCreationType.Project:
                return nameof<IProject>('projectName');
            case ModalCreationType.Epic:
                return nameof<IEpic>('epicName');
            case ModalCreationType.Sprint:
                return nameof<ISprint>('sprintName');
            default:
                return null;
        }
    };

    private getLabel = (modalType: ModalCreationType): string => {
        switch (modalType) {
            case ModalCreationType.Project:
                return 'Project';
            case ModalCreationType.Epic:
                return 'Epic';
            case ModalCreationType.Sprint:
                return 'Sprint';
            default:
                return '';
        }
    };
}
