import { FormGroup } from '@angular/forms';
import { ModalCreationType } from '../../utils/constants';

export default abstract class BaseModalCreation {
    public readonly startDate: string = 'startDate';
    public readonly endDate: string = 'endDate';

    public readonly label: string;

    constructor(private modalType: ModalCreationType) {
        this.label = this.getLabel();
    }

    public abstract formGroup: FormGroup;
    public abstract onClickCreate: () => void;

    private getLabel = (): string => {
        switch (this.modalType) {
            case ModalCreationType.Project:
                return 'Project';
            case ModalCreationType.Epic:
                return 'Epic';
            case ModalCreationType.Sprint:
                return 'Sprint';
            case ModalCreationType.Team:
                return 'Team';
            case ModalCreationType.Member:
                return 'Member';
            default:
                return '';
        }
    };
}
