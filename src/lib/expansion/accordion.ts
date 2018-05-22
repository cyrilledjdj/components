/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, Input, SimpleChanges} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {CdkAccordion} from '@angular/cdk/accordion';
import {Subject} from 'rxjs';

/** MatAccordion's display modes. */
export type MatAccordionDisplayMode = 'default' | 'flat';


 /** MatAccordion's toggle positions. */
 export type MatAccordionTogglePosition = 'before' | 'after';

/**
 * Directive for a Material Design Accordion.
 */
@Directive({
  selector: 'mat-accordion',
  exportAs: 'matAccordion',
  host: {
    class: 'mat-accordion'
  }
})
export class MatAccordion extends CdkAccordion {
  /** Stream that emits for changes in `@Input` properties. */
  _inputChanges = new Subject<SimpleChanges>();

  /** Whether the expansion indicator should be hidden. */
  @Input()
  get hideToggle(): boolean { return this._hideToggle; }
  set hideToggle(show: boolean) { this._hideToggle = coerceBooleanProperty(show); }
  private _hideToggle: boolean = false;

  /**
   * The display mode used for all expansion panels in the accordion. Currently two display
   * modes exist:
   *  default - a gutter-like spacing is placed around any expanded panel, placing the expanded
   *     panel at a different elevation from the reset of the accordion.
   *  flat - no spacing is placed around expanded panels, showing all panels at the same
   *     elevation.
   */
  @Input() displayMode: MatAccordionDisplayMode = 'default';

  /** The positioning of the expansion indicator. */
  @Input() togglePosition: MatAccordionTogglePosition = 'after';

  ngOnChanges(changes: SimpleChanges) {
    this._inputChanges.next(changes);
  }

  ngOnDestroy() {
    this._inputChanges.complete();
  }
}
