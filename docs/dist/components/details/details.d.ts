import '../icon/icon';
import BuckeyeElement from '../../internal/buckeye-element';
import type { CSSResultGroup } from 'lit';
export default class Details extends BuckeyeElement {
    static styles: CSSResultGroup;
    private readonly localize;
    details: HTMLElement;
    header: HTMLElement;
    body: HTMLElement;
    expandIconSlot: HTMLSlotElement;
    open: boolean;
    summary: string;
    disabled: boolean;
    firstUpdated(): void;
    private handleSummaryClick;
    private handleSummaryKeyDown;
    handleOpenChange(): Promise<void>;
    show(): Promise<void>;
    hide(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bui-details': Details;
    }
}
