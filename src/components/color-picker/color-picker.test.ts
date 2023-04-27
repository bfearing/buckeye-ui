import { aTimeout, expect, fixture, html, oneEvent } from '@open-wc/testing';
import { clickOnElement } from '../../internal/test';
import { runFormControlBaseTests } from '../../internal/test/form-control-base-tests';
import { sendKeys } from '@web/test-runner-commands';
import { serialize } from '../../utilities/form';
import sinon from 'sinon';
import type ColorPicker from './color-picker';

describe('<bui-color-picker>', () => {
  describe('when the value changes', () => {
    it('should not emit bui-change or bui-input when the value is changed programmatically', async () => {
      const el = await fixture<ColorPicker>(html` <bui-color-picker></bui-color-picker> `);
      const color = 'rgb(255, 204, 0)';

      el.addEventListener('bui-change', () => expect.fail('bui-change should not be emitted'));
      el.addEventListener('bui-input', () => expect.fail('bui-change should not be emitted'));
      el.value = color;
      await el.updateComplete;
    });

    it('should emit bui-change and bui-input when the color grid selector is moved', async () => {
      const el = await fixture<ColorPicker>(html` <bui-color-picker></bui-color-picker> `);
      const trigger = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="trigger"]')!;
      const grid = el.shadowRoot!.querySelector<HTMLElement>('[part~="grid"]')!;
      const changeHandler = sinon.spy();
      const inputHandler = sinon.spy();

      el.addEventListener('bui-change', changeHandler);
      el.addEventListener('bui-input', inputHandler);

      await clickOnElement(trigger); // open the dropdown
      await aTimeout(200); // wait for the dropdown to open
      await clickOnElement(grid); // click on the grid
      await el.updateComplete;

      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should emit bui-change and bui-input when the hue slider is moved', async () => {
      const el = await fixture<ColorPicker>(html` <bui-color-picker></bui-color-picker> `);
      const trigger = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="trigger"]')!;
      const slider = el.shadowRoot!.querySelector<HTMLElement>('[part~="hue-slider"]')!;
      const changeHandler = sinon.spy();
      const inputHandler = sinon.spy();

      el.addEventListener('bui-change', changeHandler);
      el.addEventListener('bui-input', inputHandler);

      await clickOnElement(trigger); // open the dropdown
      await aTimeout(200); // wait for the dropdown to open
      await clickOnElement(slider); // click on the hue slider
      await el.updateComplete;

      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should emit bui-change and bui-input when the opacity slider is moved', async () => {
      const el = await fixture<ColorPicker>(html` <bui-color-picker opacity></bui-color-picker> `);
      const trigger = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="trigger"]')!;
      const slider = el.shadowRoot!.querySelector<HTMLElement>('[part~="opacity-slider"]')!;
      const changeHandler = sinon.spy();
      const inputHandler = sinon.spy();

      el.addEventListener('bui-change', changeHandler);
      el.addEventListener('bui-input', inputHandler);

      await clickOnElement(trigger); // open the dropdown
      await aTimeout(200); // wait for the dropdown to open
      await clickOnElement(slider); // click on the opacity slider
      await el.updateComplete;

      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should emit bui-change and bui-input when toggling the format', async () => {
      const el = await fixture<ColorPicker>(html` <bui-color-picker value="#fff"></bui-color-picker> `);
      const trigger = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="trigger"]')!;
      const formatButton = el.shadowRoot!.querySelector<HTMLElement>('[part~="format-button"]')!;
      const changeHandler = sinon.spy();
      const inputHandler = sinon.spy();

      el.addEventListener('bui-change', changeHandler);
      el.addEventListener('bui-input', inputHandler);

      await clickOnElement(trigger); // open the dropdown
      await aTimeout(200); // wait for the dropdown to open
      await clickOnElement(formatButton); // click on the format button
      await el.updateComplete;

      expect(el.value).to.equal('rgb(255, 255, 255)');
      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should render the correct swatches when passing a string of color values', async () => {
      const el = await fixture<ColorPicker>(
        html` <bui-color-picker swatches="red; #008000; rgb(0,0,255);"></bui-color-picker> `
      );
      const swatches = [...el.shadowRoot!.querySelectorAll('[part~="swatch"] > div')];

      expect(swatches.length).to.equal(3);
      expect(getComputedStyle(swatches[0]).backgroundColor).to.equal('rgb(255, 0, 0)');
      expect(getComputedStyle(swatches[1]).backgroundColor).to.equal('rgb(0, 128, 0)');
      expect(getComputedStyle(swatches[2]).backgroundColor).to.equal('rgb(0, 0, 255)');
    });

    it('should render the correct swatches when passing an array of color values', async () => {
      const el = await fixture<ColorPicker>(html` <bui-color-picker></bui-color-picker> `);
      el.swatches = ['red', '#008000', 'rgb(0,0,255)'];
      await el.updateComplete;

      const swatches = [...el.shadowRoot!.querySelectorAll('[part~="swatch"] > div')];

      expect(swatches.length).to.equal(3);
      expect(getComputedStyle(swatches[0]).backgroundColor).to.equal('rgb(255, 0, 0)');
      expect(getComputedStyle(swatches[1]).backgroundColor).to.equal('rgb(0, 128, 0)');
      expect(getComputedStyle(swatches[2]).backgroundColor).to.equal('rgb(0, 0, 255)');
    });

    it('should emit bui-change and bui-input when clicking on a swatch', async () => {
      const el = await fixture<ColorPicker>(html` <bui-color-picker swatches="red; green; blue;"></bui-color-picker> `);
      const trigger = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="trigger"]')!;
      const swatch = el.shadowRoot!.querySelector<HTMLElement>('[part~="swatch"]')!;
      const changeHandler = sinon.spy();
      const inputHandler = sinon.spy();

      el.addEventListener('bui-change', changeHandler);
      el.addEventListener('bui-input', inputHandler);

      await clickOnElement(trigger); // open the dropdown
      await aTimeout(200); // wait for the dropdown to open
      await clickOnElement(swatch); // click on the swatch
      await el.updateComplete;

      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should emit bui-change and bui-input when selecting a color with the keyboard', async () => {
      const el = await fixture<ColorPicker>(html` <bui-color-picker></bui-color-picker> `);
      const trigger = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="trigger"]')!;
      const gridHandle = el.shadowRoot!.querySelector<HTMLElement>('[part~="grid-handle"]')!;
      const changeHandler = sinon.spy();
      const inputHandler = sinon.spy();

      el.addEventListener('bui-change', changeHandler);
      el.addEventListener('bui-input', inputHandler);

      await clickOnElement(trigger); // open the dropdown
      await aTimeout(200); // wait for the dropdown to open
      gridHandle.focus();
      await sendKeys({ press: 'ArrowRight' }); // move the grid handle
      await el.updateComplete;

      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should emit bui-change and bui-input when selecting a color with the keyboard', async () => {
      const el = await fixture<ColorPicker>(html` <bui-color-picker></bui-color-picker> `);
      const trigger = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="trigger"]')!;
      const handle = el.shadowRoot!.querySelector<HTMLElement>('[part~="grid-handle"]')!;
      const changeHandler = sinon.spy();
      const inputHandler = sinon.spy();

      el.addEventListener('bui-change', changeHandler);
      el.addEventListener('bui-input', inputHandler);

      await clickOnElement(trigger); // open the dropdown
      await aTimeout(200); // wait for the dropdown to open
      handle.focus();
      await sendKeys({ press: 'ArrowRight' }); // move the handle
      await el.updateComplete;

      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should emit bui-change and bui-input when selecting hue with the keyboard', async () => {
      const el = await fixture<ColorPicker>(html` <bui-color-picker></bui-color-picker> `);
      const trigger = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="trigger"]')!;
      const handle = el.shadowRoot!.querySelector<HTMLElement>('[part~="hue-slider"] > span')!;
      const changeHandler = sinon.spy();
      const inputHandler = sinon.spy();

      el.addEventListener('bui-change', changeHandler);
      el.addEventListener('bui-input', inputHandler);

      await clickOnElement(trigger); // open the dropdown
      await aTimeout(200); // wait for the dropdown to open
      handle.focus();
      await sendKeys({ press: 'ArrowRight' }); // move the handle
      await el.updateComplete;

      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should emit bui-change and bui-input when selecting opacity with the keyboard', async () => {
      const el = await fixture<ColorPicker>(html` <bui-color-picker opacity></bui-color-picker> `);
      const trigger = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="trigger"]')!;
      const handle = el.shadowRoot!.querySelector<HTMLElement>('[part~="opacity-slider"] > span')!;
      const changeHandler = sinon.spy();
      const inputHandler = sinon.spy();

      el.addEventListener('bui-change', changeHandler);
      el.addEventListener('bui-input', inputHandler);

      await clickOnElement(trigger); // open the dropdown
      await aTimeout(200); // wait for the dropdown to open
      handle.focus();
      await sendKeys({ press: 'ArrowRight' }); // move the handle
      await el.updateComplete;

      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should emit bui-change and bui-input when entering a value in the color input and pressing enter', async () => {
      const el = await fixture<ColorPicker>(html` <bui-color-picker opacity></bui-color-picker> `);
      const trigger = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="trigger"]')!;
      const input = el.shadowRoot!.querySelector<HTMLElement>('[part~="input"]')!;
      const changeHandler = sinon.spy();
      const inputHandler = sinon.spy();

      el.addEventListener('bui-change', changeHandler);
      el.addEventListener('bui-input', inputHandler);

      await clickOnElement(trigger); // open the dropdown
      await aTimeout(200); // wait for the dropdown to open
      input.focus(); // focus the input
      await el.updateComplete;
      await sendKeys({ type: 'fc0' }); // type in a color
      await sendKeys({ press: 'Enter' }); // press enter
      await el.updateComplete;

      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should emit bui-change and bui-input when entering a value in the color input and blurring the field', async () => {
      const el = await fixture<ColorPicker>(html` <bui-color-picker opacity></bui-color-picker> `);
      const trigger = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="trigger"]')!;
      const input = el.shadowRoot!.querySelector<HTMLElement>('[part~="input"]')!;
      const changeHandler = sinon.spy();
      const inputHandler = sinon.spy();

      el.addEventListener('bui-change', changeHandler);
      el.addEventListener('bui-input', inputHandler);

      await clickOnElement(trigger); // open the dropdown
      await aTimeout(200); // wait for the dropdown to open
      input.focus(); // focus the input
      await el.updateComplete;
      await sendKeys({ type: 'fc0' }); // type in a color
      input.blur(); // commit changes by blurring the field
      await el.updateComplete;

      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should render the correct format when selecting a swatch of a different format', async () => {
      const el = await fixture<ColorPicker>(html` <bui-color-picker format="rgb"></bui-color-picker> `);
      const trigger = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="trigger"]')!;
      const changeHandler = sinon.spy();
      const inputHandler = sinon.spy();

      el.addEventListener('bui-change', changeHandler);
      el.addEventListener('bui-input', inputHandler);

      el.swatches = ['#fff'];
      await el.updateComplete;
      const swatch = el.shadowRoot!.querySelector<HTMLElement>('[part~="swatch"]')!;

      await clickOnElement(trigger); // open the dropdown
      await aTimeout(200); // wait for the dropdown to open
      await clickOnElement(swatch); // click on the swatch
      await el.updateComplete;

      expect(el.value).to.equal('rgb(255, 255, 255)');
      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });
  });

  it('should render in a dropdown', async () => {
    const el = await fixture<ColorPicker>(html` <bui-color-picker></bui-color-picker> `);
    const dropdown = el.shadowRoot!.querySelector('bui-dropdown');

    expect(dropdown).to.exist;
  });

  it('should not render in a dropdown when inline is enabled', async () => {
    const el = await fixture<ColorPicker>(html` <bui-color-picker inline></bui-color-picker> `);
    const dropdown = el.shadowRoot!.querySelector('bui-dropdown');

    expect(dropdown).to.not.exist;
  });

  it('should show opacity slider when opacity is enabled', async () => {
    const el = await fixture<ColorPicker>(html` <bui-color-picker opacity></bui-color-picker> `);
    const opacitySlider = el.shadowRoot!.querySelector('[part*="opacity-slider"]')!;

    expect(opacitySlider).to.exist;
  });

  it('should display a color when an initial value is provided', async () => {
    const el = await fixture<ColorPicker>(html` <bui-color-picker value="#000"></bui-color-picker> `);
    const trigger = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="trigger"]');

    expect(trigger?.style.color).to.equal('rgb(0, 0, 0)');
  });

  it('should display a color with opacity when an initial value with opacity is provided', async () => {
    const el = await fixture<ColorPicker>(html` <bui-color-picker opacity value="#ff000050"></bui-color-picker> `);
    const trigger = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="trigger"]')!;
    const previewButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="preview"]');
    const previewColor = getComputedStyle(previewButton!).getPropertyValue('--preview-color');

    expect(trigger.style.color).to.equal('rgba(255, 0, 0, 0.314)');
    expect(previewColor).to.equal('#ff000050');
  });

  it('should emit bui-focus when rendered as a dropdown and focused', async () => {
    const el = await fixture<ColorPicker>(html`
      <div>
        <bui-color-picker></bui-color-picker>
        <button type="button">Click me</button>
      </div>
    `);
    const colorPicker = el.querySelector('bui-color-picker')!;
    const trigger = colorPicker.shadowRoot!.querySelector<HTMLButtonElement>('[part~="trigger"]')!;
    const button = el.querySelector('button')!;
    const focusHandler = sinon.spy();
    const blurHandler = sinon.spy();

    colorPicker.addEventListener('bui-focus', focusHandler);
    colorPicker.addEventListener('bui-blur', blurHandler);

    await clickOnElement(trigger);
    await colorPicker.updateComplete;
    expect(focusHandler).to.have.been.calledOnce;

    await clickOnElement(button);
    await colorPicker.updateComplete;
    expect(blurHandler).to.have.been.calledOnce;
  });

  it('should emit bui-focus when rendered inline and focused', async () => {
    const el = await fixture<ColorPicker>(html`
      <div>
        <bui-color-picker inline></bui-color-picker>
        <button type="button">Click me</button>
      </div>
    `);
    const colorPicker = el.querySelector('bui-color-picker')!;
    const button = el.querySelector('button')!;
    const focusHandler = sinon.spy();
    const blurHandler = sinon.spy();

    colorPicker.addEventListener('bui-focus', focusHandler);
    colorPicker.addEventListener('bui-blur', blurHandler);

    await clickOnElement(colorPicker);
    await colorPicker.updateComplete;
    expect(focusHandler).to.have.been.calledOnce;

    await clickOnElement(button);
    await colorPicker.updateComplete;
    expect(blurHandler).to.have.been.calledOnce;
  });

  it('should focus and blur when calling focus() and blur() and rendered as a dropdown', async () => {
    const colorPicker = await fixture<ColorPicker>(html` <bui-color-picker></bui-color-picker> `);
    const focusHandler = sinon.spy();
    const blurHandler = sinon.spy();

    colorPicker.addEventListener('bui-focus', focusHandler);
    colorPicker.addEventListener('bui-blur', blurHandler);

    // Focus
    colorPicker.focus();
    await colorPicker.updateComplete;

    expect(document.activeElement).to.equal(colorPicker);
    expect(focusHandler).to.have.been.calledOnce;

    // Blur
    colorPicker.blur();
    await colorPicker.updateComplete;

    expect(document.activeElement).to.equal(document.body);
    expect(blurHandler).to.have.been.calledOnce;
  });

  it('should focus and blur when calling focus() and blur() and rendered inline', async () => {
    const colorPicker = await fixture<ColorPicker>(html` <bui-color-picker inline></bui-color-picker> `);
    const focusHandler = sinon.spy();
    const blurHandler = sinon.spy();

    colorPicker.addEventListener('bui-focus', focusHandler);
    colorPicker.addEventListener('bui-blur', blurHandler);

    // Focus
    colorPicker.focus();
    await colorPicker.updateComplete;

    expect(document.activeElement).to.equal(colorPicker);
    expect(focusHandler).to.have.been.calledOnce;

    // Blur
    colorPicker.blur();
    await colorPicker.updateComplete;

    expect(document.activeElement).to.equal(document.body);
    expect(blurHandler).to.have.been.calledOnce;
  });

  describe('when submitting a form', () => {
    it('should serialize its name and value with FormData', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <bui-color-picker name="a" value="#ffcc00"></bui-color-picker>
        </form>
      `);
      const formData = new FormData(form);
      expect(formData.get('a')).to.equal('#ffcc00');
    });

    it('should serialize its name and value with JSON', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <bui-color-picker name="a" value="#ffcc00"></bui-color-picker>
        </form>
      `);
      const json = serialize(form);
      expect(json.a).to.equal('#ffcc00');
    });

    it('should be present in form data when using the form attribute and located outside of a <form>', async () => {
      const el = await fixture<HTMLFormElement>(html`
        <div>
          <form id="f">
            <bui-button type="submit">Submit</bui-button>
          </form>
          <bui-color-picker form="f" name="a" value="#ffcc00"></bui-color-picker>
        </div>
      `);
      const form = el.querySelector('form')!;
      const formData = new FormData(form);

      expect(formData.get('a')).to.equal('#ffcc00');
    });
  });

  describe('when resetting a form', () => {
    it('should reset the element to its initial value', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <bui-color-picker name="a" value="#ffffff"></bui-color-picker>
          <bui-button type="reset">Reset</bui-button>
        </form>
      `);
      const button = form.querySelector('bui-button')!;
      const colorPicker = form.querySelector('bui-color-picker')!;
      colorPicker.value = '#000000';

      await colorPicker.updateComplete;

      setTimeout(() => button.click());
      await oneEvent(form, 'reset');
      await colorPicker.updateComplete;

      expect(colorPicker.value).to.equal('#ffffff');

      colorPicker.defaultValue = '';

      setTimeout(() => button.click());
      await oneEvent(form, 'reset');
      await colorPicker.updateComplete;

      expect(colorPicker.value).to.equal('');
    });
  });

  describe('when using constraint validation', () => {
    it('should be valid by default', async () => {
      const el = await fixture<ColorPicker>(html` <bui-color-picker></bui-color-picker> `);
      expect(el.checkValidity()).to.be.true;
    });

    it('should be invalid when required and empty', async () => {
      const el = await fixture<ColorPicker>(html` <bui-color-picker required></bui-color-picker> `);
      expect(el.checkValidity()).to.be.false;
    });

    it('should be invalid when required and disabled is removed', async () => {
      const el = await fixture<ColorPicker>(html` <bui-color-picker disabled required></bui-color-picker> `);
      el.disabled = false;
      await el.updateComplete;
      expect(el.checkValidity()).to.be.false;
    });

    it('should receive the correct validation attributes ("states") when valid', async () => {
      const el = await fixture<ColorPicker>(html` <bui-color-picker required value="#fff"></bui-color-picker> `);
      const trigger = el.shadowRoot!.querySelector('[part~="trigger"]')!;
      const grid = el.shadowRoot!.querySelector('[part~="grid"]')!;

      expect(el.checkValidity()).to.be.true;
      expect(el.hasAttribute('data-required')).to.be.true;
      expect(el.hasAttribute('data-optional')).to.be.false;
      expect(el.hasAttribute('data-invalid')).to.be.false;
      expect(el.hasAttribute('data-valid')).to.be.true;
      expect(el.hasAttribute('data-user-invalid')).to.be.false;
      expect(el.hasAttribute('data-user-valid')).to.be.false;

      await clickOnElement(trigger);
      await aTimeout(500);
      await clickOnElement(grid);
      await el.updateComplete;

      expect(el.checkValidity()).to.be.true;
      expect(el.hasAttribute('data-user-invalid')).to.be.false;
      expect(el.hasAttribute('data-user-valid')).to.be.true;
    });

    it('should receive the correct validation attributes ("states") when invalid', async () => {
      const el = await fixture<ColorPicker>(html` <bui-color-picker required></bui-color-picker> `);
      const trigger = el.shadowRoot!.querySelector('[part~="trigger"]')!;
      const grid = el.shadowRoot!.querySelector('[part~="grid"]')!;

      expect(el.hasAttribute('data-required')).to.be.true;
      expect(el.hasAttribute('data-optional')).to.be.false;
      expect(el.hasAttribute('data-invalid')).to.be.true;
      expect(el.hasAttribute('data-valid')).to.be.false;
      expect(el.hasAttribute('data-user-invalid')).to.be.false;
      expect(el.hasAttribute('data-user-valid')).to.be.false;

      await clickOnElement(trigger);
      await aTimeout(500);
      await clickOnElement(grid);
      await el.updateComplete;

      expect(el.checkValidity()).to.be.true;
      expect(el.hasAttribute('data-user-invalid')).to.be.false;
      expect(el.hasAttribute('data-user-valid')).to.be.true;
    });
  });

  runFormControlBaseTests('bui-color-picker');
});
