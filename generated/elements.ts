

export type ElementTagNameMap = {
  svg: {
    /**
     * Scalable Vector Graphics (SVG) 1.1 (Second Edition)
     * https://www.w3.org/TR/SVG11/
     */
    'SVG11': {
      /** https://www.w3.org/TR/SVG11/struct.html#SVGElement */
      'svg': {
        type: SVGSVGElement,
      },

      /** https://www.w3.org/TR/SVG11/struct.html#GElement */
      'g': {
        type: SVGGElement,
      },

      /** https://www.w3.org/TR/SVG11/struct.html#DefsElement */
      'defs': {
        type: SVGDefsElement,
      },

      /** https://www.w3.org/TR/SVG11/struct.html#DescElement */
      'desc': {
        type: SVGDescElement,
      },

      /** https://www.w3.org/TR/SVG11/struct.html#TitleElement */
      'title': {
        type: SVGTitleElement,
      },

      /** https://www.w3.org/TR/SVG11/struct.html#SymbolElement */
      'symbol': {
        type: SVGSymbolElement,
      },

      /** https://www.w3.org/TR/SVG11/struct.html#UseElement */
      'use': {
        type: SVGUseElement,
      },

      /** https://www.w3.org/TR/SVG11/struct.html#ImageElement */
      'image': {
        type: SVGImageElement,
      },

      /** https://www.w3.org/TR/SVG11/struct.html#SwitchElement */
      'switch': {
        type: SVGSwitchElement,
      },

      /** https://www.w3.org/TR/SVG11/styling.html#StyleElement */
      'style': {
        type: SVGStyleElement,
      },

      /** https://www.w3.org/TR/SVG11/paths.html#PathElement */
      'path': {
        type: SVGPathElement,
      },

      /** https://www.w3.org/TR/SVG11/shapes.html#RectElement */
      'rect': {
        type: SVGRectElement,
      },

      /** https://www.w3.org/TR/SVG11/shapes.html#CircleElement */
      'circle': {
        type: SVGCircleElement,
      },

      /** https://www.w3.org/TR/SVG11/shapes.html#EllipseElement */
      'ellipse': {
        type: SVGEllipseElement,
      },

      /** https://www.w3.org/TR/SVG11/shapes.html#LineElement */
      'line': {
        type: SVGLineElement,
      },

      /** https://www.w3.org/TR/SVG11/shapes.html#PolylineElement */
      'polyline': {
        type: SVGPolylineElement,
      },

      /** https://www.w3.org/TR/SVG11/shapes.html#PolygonElement */
      'polygon': {
        type: SVGPolygonElement,
      },

      /** https://www.w3.org/TR/SVG11/text.html#TextElement */
      'text': {
        type: SVGTextElement,
      },

      /** https://www.w3.org/TR/SVG11/text.html#TSpanElement */
      'tspan': {
        type: SVGTSpanElement,
      },

      /** https://www.w3.org/TR/SVG11/text.html#TextPathElement */
      'textPath': {
        type: SVGTextPathElement,
      },

      /** https://www.w3.org/TR/SVG11/painting.html#MarkerElement */
      'marker': {
        type: SVGMarkerElement,
      },

      /** https://www.w3.org/TR/SVG11/pservers.html#LinearGradients */
      'linearGradient': {
        type: SVGLinearGradientElement,
      },

      /** https://www.w3.org/TR/SVG11/pservers.html#RadialGradients */
      'radialGradient': {
        type: SVGRadialGradientElement,
      },

      /** https://www.w3.org/TR/SVG11/pservers.html#GradientStops */
      'stop': {
        type: SVGStopElement,
      },

      /** https://www.w3.org/TR/SVG11/pservers.html#Patterns */
      'pattern': {
        type: SVGPatternElement,
      },

      /** https://www.w3.org/TR/SVG11/masking.html#EstablishingANewClippingPath */
      'clipPath': {
        type: SVGClipPathElement,
      },

      /** https://www.w3.org/TR/SVG11/masking.html#Masking */
      'mask': {
        type: SVGMaskElement,
      },

      /** https://www.w3.org/TR/SVG11/filters.html#FilterElement */
      'filter': {
        type: SVGFilterElement,
      },

      /** https://www.w3.org/TR/SVG11/filters.html#feDistantLightElement */
      'feDistantLight': {
        type: SVGFEDistantLightElement,
      },

      /** https://www.w3.org/TR/SVG11/filters.html#fePointLightElement */
      'fePointLight': {
        type: SVGFEPointLightElement,
      },

      /** https://www.w3.org/TR/SVG11/filters.html#feSpotLightElement */
      'feSpotLight': {
        type: SVGFESpotLightElement,
      },

      /** https://www.w3.org/TR/SVG11/filters.html#feBlendElement */
      'feBlend': {
        type: SVGFEBlendElement,
      },

      /** https://www.w3.org/TR/SVG11/filters.html#feColorMatrixElement */
      'feColorMatrix': {
        type: SVGFEColorMatrixElement,
      },

      /** https://www.w3.org/TR/SVG11/filters.html#feComponentTransferElement */
      'feComponentTransfer': {
        type: SVGFEComponentTransferElement,
      },

      /** https://www.w3.org/TR/SVG11/filters.html#feFuncRElement */
      'feFuncR': {
        type: SVGFEFuncRElement,
      },

      /** https://www.w3.org/TR/SVG11/filters.html#feFuncGElement */
      'feFuncG': {
        type: SVGFEFuncGElement,
      },

      /** https://www.w3.org/TR/SVG11/filters.html#feFuncBElement */
      'feFuncB': {
        type: SVGFEFuncBElement,
      },

      /** https://www.w3.org/TR/SVG11/filters.html#feFuncAElement */
      'feFuncA': {
        type: SVGFEFuncAElement,
      },

      /** https://www.w3.org/TR/SVG11/filters.html#feCompositeElement */
      'feComposite': {
        type: SVGFECompositeElement,
      },

      /** https://www.w3.org/TR/SVG11/filters.html#feConvolveMatrixElement */
      'feConvolveMatrix': {
        type: SVGFEConvolveMatrixElement,
      },

      /** https://www.w3.org/TR/SVG11/filters.html#feDiffuseLightingElement */
      'feDiffuseLighting': {
        type: SVGFEDiffuseLightingElement,
      },

      /** https://www.w3.org/TR/SVG11/filters.html#feDisplacementMapElement */
      'feDisplacementMap': {
        type: SVGFEDisplacementMapElement,
      },

      /** https://www.w3.org/TR/SVG11/filters.html#feFloodElement */
      'feFlood': {
        type: SVGFEFloodElement,
      },

      /** https://www.w3.org/TR/SVG11/filters.html#feGaussianBlurElement */
      'feGaussianBlur': {
        type: SVGFEGaussianBlurElement,
      },

      /** https://www.w3.org/TR/SVG11/filters.html#feImageElement */
      'feImage': {
        type: SVGFEImageElement,
      },

      /** https://www.w3.org/TR/SVG11/filters.html#feMergeElement */
      'feMerge': {
        type: SVGFEMergeElement,
      },

      /** https://www.w3.org/TR/SVG11/filters.html#feMergeNodeElement */
      'feMergeNode': {
        type: SVGFEMergeNodeElement,
      },

      /** https://www.w3.org/TR/SVG11/filters.html#feMorphologyElement */
      'feMorphology': {
        type: SVGFEMorphologyElement,
      },

      /** https://www.w3.org/TR/SVG11/filters.html#feOffsetElement */
      'feOffset': {
        type: SVGFEOffsetElement,
      },

      /** https://www.w3.org/TR/SVG11/filters.html#feSpecularLightingElement */
      'feSpecularLighting': {
        type: SVGFESpecularLightingElement,
      },

      /** https://www.w3.org/TR/SVG11/filters.html#feTileElement */
      'feTile': {
        type: SVGFETileElement,
      },

      /** https://www.w3.org/TR/SVG11/filters.html#feTurbulenceElement */
      'feTurbulence': {
        type: SVGFETurbulenceElement,
      },

      /** https://www.w3.org/TR/SVG11/linking.html#AElement */
      'a': {
        type: SVGAElement,
      },

      /** https://www.w3.org/TR/SVG11/linking.html#ViewElement */
      'view': {
        type: SVGViewElement,
      },

      /** https://www.w3.org/TR/SVG11/script.html#ScriptElement */
      'script': {
        type: SVGScriptElement,
      },

      /** https://www.w3.org/TR/SVG11/animate.html#AnimateElement */
      'animate': {
        type: SVGAnimateElement,
      },

      /** https://www.w3.org/TR/SVG11/animate.html#SetElement */
      'set': {
        type: SVGSetElement,
      },

      /** https://www.w3.org/TR/SVG11/animate.html#AnimateMotionElement */
      'animateMotion': {
        type: SVGAnimateMotionElement,
      },

      /** https://www.w3.org/TR/SVG11/animate.html#MPathElement */
      'mpath': {
        type: SVGMPathElement,
      },

      /** https://www.w3.org/TR/SVG11/animate.html#AnimateTransformElement */
      'animateTransform': {
        type: SVGAnimateTransformElement,
      },

      /** https://www.w3.org/TR/SVG11/metadata.html#MetadataElement */
      'metadata': {
        type: SVGMetadataElement,
      },

      /** https://www.w3.org/TR/SVG11/extend.html#ForeignObjectElement */
      'foreignObject': {
        type: SVGForeignObjectElement,
      },
    },
  },

  html: {
    /**
     * HTML Standard
     * https://html.spec.whatwg.org/multipage/
     */
    'html': {
      /** https://html.spec.whatwg.org/multipage/semantics.html#the-html-element */
      'html': {
        type: HTMLHtmlElement,
      },

      /** https://html.spec.whatwg.org/multipage/semantics.html#the-head-element */
      'head': {
        type: HTMLHeadElement,
      },

      /** https://html.spec.whatwg.org/multipage/semantics.html#the-title-element */
      'title': {
        type: HTMLTitleElement,
      },

      /** https://html.spec.whatwg.org/multipage/semantics.html#the-base-element */
      'base': {
        type: HTMLBaseElement,
      },

      /** https://html.spec.whatwg.org/multipage/semantics.html#the-link-element */
      'link': {
        type: HTMLLinkElement,
      },

      /** https://html.spec.whatwg.org/multipage/semantics.html#meta */
      'meta': {
        type: HTMLMetaElement,
      },

      /** https://html.spec.whatwg.org/multipage/semantics.html#the-style-element */
      'style': {
        type: HTMLStyleElement,
      },

      /** https://html.spec.whatwg.org/multipage/sections.html#the-body-element */
      'body': {
        type: HTMLBodyElement,
      },

      /** https://html.spec.whatwg.org/multipage/sections.html#the-article-element */
      'article': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/sections.html#the-section-element */
      'section': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/sections.html#the-nav-element */
      'nav': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/sections.html#the-aside-element */
      'aside': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/sections.html#the-h1-element */
      'h1': {
        type: HTMLHeadingElement,
      },

      /** https://html.spec.whatwg.org/multipage/sections.html#the-h2-element */
      'h2': {
        type: HTMLHeadingElement,
      },

      /** https://html.spec.whatwg.org/multipage/sections.html#the-h3-element */
      'h3': {
        type: HTMLHeadingElement,
      },

      /** https://html.spec.whatwg.org/multipage/sections.html#the-h4-element */
      'h4': {
        type: HTMLHeadingElement,
      },

      /** https://html.spec.whatwg.org/multipage/sections.html#the-h5-element */
      'h5': {
        type: HTMLHeadingElement,
      },

      /** https://html.spec.whatwg.org/multipage/sections.html#the-h6-element */
      'h6': {
        type: HTMLHeadingElement,
      },

      /** https://html.spec.whatwg.org/multipage/sections.html#the-hgroup-element */
      'hgroup': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/sections.html#the-header-element */
      'header': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/sections.html#the-footer-element */
      'footer': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/sections.html#the-address-element */
      'address': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/grouping-content.html#the-p-element */
      'p': {
        type: HTMLParagraphElement,
      },

      /** https://html.spec.whatwg.org/multipage/grouping-content.html#the-hr-element */
      'hr': {
        type: HTMLHRElement,
      },

      /** https://html.spec.whatwg.org/multipage/grouping-content.html#the-pre-element */
      'pre': {
        type: HTMLPreElement,
      },

      /** https://html.spec.whatwg.org/multipage/grouping-content.html#the-blockquote-element */
      'blockquote': {
        type: HTMLQuoteElement,
      },

      /** https://html.spec.whatwg.org/multipage/grouping-content.html#the-ol-element */
      'ol': {
        type: HTMLOListElement,
      },

      /** https://html.spec.whatwg.org/multipage/grouping-content.html#the-ul-element */
      'ul': {
        type: HTMLUListElement,
      },

      /** https://html.spec.whatwg.org/multipage/grouping-content.html#menus */
      'menu': {
        type: HTMLMenuElement,
      },

      /** https://html.spec.whatwg.org/multipage/grouping-content.html#the-li-element */
      'li': {
        type: HTMLLIElement,
      },

      /** https://html.spec.whatwg.org/multipage/grouping-content.html#the-dl-element */
      'dl': {
        type: HTMLDListElement,
      },

      /** https://html.spec.whatwg.org/multipage/grouping-content.html#the-dt-element */
      'dt': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/grouping-content.html#the-dd-element */
      'dd': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/grouping-content.html#the-figure-element */
      'figure': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/grouping-content.html#the-figcaption-element */
      'figcaption': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/grouping-content.html#the-main-element */
      'main': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/grouping-content.html#the-search-element */
      'search': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/grouping-content.html#the-div-element */
      'div': {
        type: HTMLDivElement,
      },

      /** https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element */
      'a': {
        type: HTMLAnchorElement,
      },

      /** https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-em-element */
      'em': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-strong-element */
      'strong': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-small-element */
      'small': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-s-element */
      's': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-cite-element */
      'cite': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-q-element */
      'q': {
        type: HTMLQuoteElement,
      },

      /** https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-dfn-element */
      'dfn': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-abbr-element */
      'abbr': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-ruby-element */
      'ruby': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-rt-element */
      'rt': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-rp-element */
      'rp': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-data-element */
      'data': {
        type: HTMLDataElement,
      },

      /** https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-time-element */
      'time': {
        type: HTMLTimeElement,
      },

      /** https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-code-element */
      'code': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-var-element */
      'var': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-samp-element */
      'samp': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-kbd-element */
      'kbd': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-sub-element */
      'sub': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-sup-element */
      'sup': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-i-element */
      'i': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-b-element */
      'b': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-u-element */
      'u': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-mark-element */
      'mark': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-bdi-element */
      'bdi': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-bdo-element */
      'bdo': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-span-element */
      'span': {
        type: HTMLSpanElement,
      },

      /** https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-br-element */
      'br': {
        type: HTMLBRElement,
      },

      /** https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-wbr-element */
      'wbr': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/edits.html#the-ins-element */
      'ins': {
        type: HTMLModElement,
      },

      /** https://html.spec.whatwg.org/multipage/edits.html#the-del-element */
      'del': {
        type: HTMLModElement,
      },

      /** https://html.spec.whatwg.org/multipage/embedded-content.html#the-picture-element */
      'picture': {
        type: HTMLPictureElement,
      },

      /** https://html.spec.whatwg.org/multipage/embedded-content.html#the-source-element */
      'source': {
        type: HTMLSourceElement,
      },

      /** https://html.spec.whatwg.org/multipage/embedded-content.html#the-img-element */
      'img': {
        type: HTMLImageElement,
      },

      /** https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-iframe-element */
      'iframe': {
        type: HTMLIFrameElement,
      },

      /** https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-embed-element */
      'embed': {
        type: HTMLEmbedElement,
      },

      /** https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-object-element */
      'object': {
        type: HTMLObjectElement,
      },

      /** https://html.spec.whatwg.org/multipage/media.html#video */
      'video': {
        type: HTMLVideoElement,
      },

      /** https://html.spec.whatwg.org/multipage/media.html#audio */
      'audio': {
        type: HTMLAudioElement,
      },

      /** https://html.spec.whatwg.org/multipage/media.html#the-track-element */
      'track': {
        type: HTMLTrackElement,
      },

      /** https://html.spec.whatwg.org/multipage/image-maps.html#the-map-element */
      'map': {
        type: HTMLMapElement,
      },

      /** https://html.spec.whatwg.org/multipage/image-maps.html#the-area-element */
      'area': {
        type: HTMLAreaElement,
      },

      /** https://html.spec.whatwg.org/multipage/tables.html#the-table-element */
      'table': {
        type: HTMLTableElement,
      },

      /** https://html.spec.whatwg.org/multipage/tables.html#the-caption-element */
      'caption': {
        type: HTMLTableCaptionElement,
      },

      /** https://html.spec.whatwg.org/multipage/tables.html#the-colgroup-element */
      'colgroup': {
        type: HTMLTableColElement,
      },

      /** https://html.spec.whatwg.org/multipage/tables.html#the-col-element */
      'col': {
        type: HTMLTableColElement,
      },

      /** https://html.spec.whatwg.org/multipage/tables.html#the-tbody-element */
      'tbody': {
        type: HTMLTableSectionElement,
      },

      /** https://html.spec.whatwg.org/multipage/tables.html#the-thead-element */
      'thead': {
        type: HTMLTableSectionElement,
      },

      /** https://html.spec.whatwg.org/multipage/tables.html#the-tfoot-element */
      'tfoot': {
        type: HTMLTableSectionElement,
      },

      /** https://html.spec.whatwg.org/multipage/tables.html#the-tr-element */
      'tr': {
        type: HTMLTableRowElement,
      },

      /** https://html.spec.whatwg.org/multipage/tables.html#the-td-element */
      'td': {
        type: HTMLTableCellElement,
      },

      /** https://html.spec.whatwg.org/multipage/tables.html#the-th-element */
      'th': {
        type: HTMLTableCellElement,
      },

      /** https://html.spec.whatwg.org/multipage/forms.html#the-form-element */
      'form': {
        type: HTMLFormElement,
      },

      /** https://html.spec.whatwg.org/multipage/forms.html#the-label-element */
      'label': {
        type: HTMLLabelElement,
      },

      /** https://html.spec.whatwg.org/multipage/input.html#the-input-element */
      'input': {
        type: HTMLInputElement,
      },

      /** https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element */
      'button': {
        type: HTMLButtonElement,
      },

      /** https://html.spec.whatwg.org/multipage/form-elements.html#the-select-element */
      'select': {
        type: HTMLSelectElement,
      },

      /** https://html.spec.whatwg.org/multipage/form-elements.html#the-datalist-element */
      'datalist': {
        type: HTMLDataListElement,
      },

      /** https://html.spec.whatwg.org/multipage/form-elements.html#the-optgroup-element */
      'optgroup': {
        type: HTMLOptGroupElement,
      },

      /** https://html.spec.whatwg.org/multipage/form-elements.html#the-option-element */
      'option': {
        type: HTMLOptionElement,
      },

      /** https://html.spec.whatwg.org/multipage/form-elements.html#the-textarea-element */
      'textarea': {
        type: HTMLTextAreaElement,
      },

      /** https://html.spec.whatwg.org/multipage/form-elements.html#the-output-element */
      'output': {
        type: HTMLOutputElement,
      },

      /** https://html.spec.whatwg.org/multipage/form-elements.html#the-progress-element */
      'progress': {
        type: HTMLProgressElement,
      },

      /** https://html.spec.whatwg.org/multipage/form-elements.html#the-meter-element */
      'meter': {
        type: HTMLMeterElement,
      },

      /** https://html.spec.whatwg.org/multipage/form-elements.html#the-fieldset-element */
      'fieldset': {
        type: HTMLFieldSetElement,
      },

      /** https://html.spec.whatwg.org/multipage/form-elements.html#the-legend-element */
      'legend': {
        type: HTMLLegendElement,
      },

      /** https://html.spec.whatwg.org/multipage/interactive-elements.html#the-details-element */
      'details': {
        type: HTMLDetailsElement,
      },

      /** https://html.spec.whatwg.org/multipage/interactive-elements.html#the-summary-element */
      'summary': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element */
      'dialog': {
        type: HTMLDialogElement,
      },

      /** https://html.spec.whatwg.org/multipage/scripting.html#script */
      'script': {
        type: HTMLScriptElement,
      },

      /** https://html.spec.whatwg.org/multipage/scripting.html#the-noscript-element */
      'noscript': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/scripting.html#the-template-element */
      'template': {
        type: HTMLTemplateElement,
      },

      /** https://html.spec.whatwg.org/multipage/scripting.html#the-slot-element */
      'slot': {
        type: HTMLSlotElement,
      },

      /** https://html.spec.whatwg.org/multipage/canvas.html#canvas */
      'canvas': {
        type: HTMLCanvasElement,
      },

      /** https://html.spec.whatwg.org/multipage/obsolete.html#applet */
      'applet': {
        type: HTMLUnknownElement,
      },

      /** https://html.spec.whatwg.org/multipage/obsolete.html#acronym */
      'acronym': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/obsolete.html#bgsound */
      'bgsound': {
        type: HTMLUnknownElement,
      },

      /** https://html.spec.whatwg.org/multipage/obsolete.html#dir */
      'dir': {
        type: HTMLDirectoryElement,
      },

      /** https://html.spec.whatwg.org/multipage/obsolete.html#frame */
      'frame': {
        type: HTMLFrameElement,
      },

      /** https://html.spec.whatwg.org/multipage/obsolete.html#frameset */
      'frameset': {
        type: HTMLFrameSetElement,
      },

      /** https://html.spec.whatwg.org/multipage/obsolete.html#noframes */
      'noframes': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/obsolete.html#isindex */
      'isindex': {
        type: HTMLUnknownElement,
      },

      /** https://html.spec.whatwg.org/multipage/obsolete.html#keygen */
      'keygen': {
        type: HTMLUnknownElement,
      },

      /** https://html.spec.whatwg.org/multipage/obsolete.html#listing */
      'listing': {
        type: HTMLPreElement,
      },

      /** https://html.spec.whatwg.org/multipage/obsolete.html#menuitem */
      'menuitem': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/obsolete.html#nextid */
      'nextid': {
        type: HTMLUnknownElement,
      },

      /** https://html.spec.whatwg.org/multipage/obsolete.html#noembed */
      'noembed': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/obsolete.html#param */
      'param': {
        type: HTMLParamElement,
      },

      /** https://html.spec.whatwg.org/multipage/obsolete.html#plaintext */
      'plaintext': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/obsolete.html#rb */
      'rb': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/obsolete.html#rtc */
      'rtc': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/obsolete.html#strike */
      'strike': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/obsolete.html#xmp */
      'xmp': {
        type: HTMLPreElement,
      },

      /** https://html.spec.whatwg.org/multipage/obsolete.html#basefont */
      'basefont': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/obsolete.html#big */
      'big': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/obsolete.html#blink */
      'blink': {
        type: HTMLUnknownElement,
      },

      /** https://html.spec.whatwg.org/multipage/obsolete.html#center */
      'center': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/obsolete.html#font */
      'font': {
        type: HTMLFontElement,
      },

      /** https://html.spec.whatwg.org/multipage/obsolete.html#the-marquee-element */
      'marquee': {
        type: HTMLMarqueeElement,
      },

      /** https://html.spec.whatwg.org/multipage/obsolete.html#multicol */
      'multicol': {
        type: HTMLUnknownElement,
      },

      /** https://html.spec.whatwg.org/multipage/obsolete.html#nobr */
      'nobr': {
        type: HTMLElement,
      },

      /** https://html.spec.whatwg.org/multipage/obsolete.html#spacer */
      'spacer': {
        type: HTMLUnknownElement,
      },

      /** https://html.spec.whatwg.org/multipage/obsolete.html#tt */
      'tt': {
        type: HTMLElement,
      },
    },
  },

  mathml: {
    /**
     * MathML Core
     * https://w3c.github.io/mathml-core/
     */
    'mathml-core': {
      /** https://w3c.github.io/mathml-core/#dfn-math */
      'math': {
        type: MathMLElement,
      },

      /** https://w3c.github.io/mathml-core/#dfn-mtext */
      'mtext': {
        type: MathMLElement,
      },

      /** https://w3c.github.io/mathml-core/#dfn-mi */
      'mi': {
        type: MathMLElement,
      },

      /** https://w3c.github.io/mathml-core/#dfn-mn */
      'mn': {
        type: MathMLElement,
      },

      /** https://w3c.github.io/mathml-core/#dfn-mo */
      'mo': {
        type: MathMLElement,
      },

      /** https://w3c.github.io/mathml-core/#dfn-mspace */
      'mspace': {
        type: MathMLElement,
      },

      /** https://w3c.github.io/mathml-core/#dfn-ms */
      'ms': {
        type: MathMLElement,
      },

      /** https://w3c.github.io/mathml-core/#dfn-mrow */
      'mrow': {
        type: MathMLElement,
      },

      /** https://w3c.github.io/mathml-core/#dfn-mfrac */
      'mfrac': {
        type: MathMLElement,
      },

      /** https://w3c.github.io/mathml-core/#dfn-msqrt */
      'msqrt': {
        type: MathMLElement,
      },

      /** https://w3c.github.io/mathml-core/#dfn-mroot */
      'mroot': {
        type: MathMLElement,
      },

      /** https://w3c.github.io/mathml-core/#dfn-mstyle */
      'mstyle': {
        type: MathMLElement,
      },

      /** https://w3c.github.io/mathml-core/#dfn-merror */
      'merror': {
        type: MathMLElement,
      },

      /** https://w3c.github.io/mathml-core/#dfn-mpadded */
      'mpadded': {
        type: MathMLElement,
      },

      /** https://w3c.github.io/mathml-core/#dfn-mphantom */
      'mphantom': {
        type: MathMLElement,
      },

      /** https://w3c.github.io/mathml-core/#dfn-msub */
      'msub': {
        type: MathMLElement,
      },

      /** https://w3c.github.io/mathml-core/#dfn-msup */
      'msup': {
        type: MathMLElement,
      },

      /** https://w3c.github.io/mathml-core/#dfn-msubsup */
      'msubsup': {
        type: MathMLElement,
      },

      /** https://w3c.github.io/mathml-core/#dfn-munder */
      'munder': {
        type: MathMLElement,
      },

      /** https://w3c.github.io/mathml-core/#dfn-mover */
      'mover': {
        type: MathMLElement,
      },

      /** https://w3c.github.io/mathml-core/#dfn-munderover */
      'munderover': {
        type: MathMLElement,
      },

      /** https://w3c.github.io/mathml-core/#dfn-mmultiscripts */
      'mmultiscripts': {
        type: MathMLElement,
      },

      /** https://w3c.github.io/mathml-core/#dfn-mprescripts */
      'mprescripts': {
        type: MathMLElement,
      },

      /** https://w3c.github.io/mathml-core/#dfn-mtable */
      'mtable': {
        type: MathMLElement,
      },

      /** https://w3c.github.io/mathml-core/#dfn-mtr */
      'mtr': {
        type: MathMLElement,
      },

      /** https://w3c.github.io/mathml-core/#dfn-mtd */
      'mtd': {
        type: MathMLElement,
      },

      /** https://w3c.github.io/mathml-core/#dfn-maction */
      'maction': {
        type: MathMLElement,
      },

      /** https://w3c.github.io/mathml-core/#dfn-semantics */
      'semantics': {
        type: MathMLElement,
      },

      /** https://w3c.github.io/mathml-core/#dfn-annotation */
      'annotation': {
        type: MathMLElement,
      },

      /** https://w3c.github.io/mathml-core/#dfn-annotation-xml */
      'annotation-xml': {
        type: MathMLElement,
      },
    },
  },
};

export const tags =  {"svg":["svg","g","defs","desc","title","symbol","use","image","switch","style","path","rect","circle","ellipse","line","polyline","polygon","text","tspan","textPath","marker","linearGradient","radialGradient","stop","pattern","clipPath","mask","filter","feDistantLight","fePointLight","feSpotLight","feBlend","feColorMatrix","feComponentTransfer","feFuncR","feFuncG","feFuncB","feFuncA","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feFlood","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","feSpecularLighting","feTile","feTurbulence","a","view","script","animate","set","animateMotion","mpath","animateTransform","metadata","foreignObject"],"html":["html","head","title","base","link","meta","style","body","article","section","nav","aside","h1","h2","h3","h4","h5","h6","hgroup","header","footer","address","p","hr","pre","blockquote","ol","ul","menu","li","dl","dt","dd","figure","figcaption","main","search","div","a","em","strong","small","s","cite","q","dfn","abbr","ruby","rt","rp","data","time","code","var","samp","kbd","sub","sup","i","b","u","mark","bdi","bdo","span","br","wbr","ins","del","picture","source","img","iframe","embed","object","video","audio","track","map","area","table","caption","colgroup","col","tbody","thead","tfoot","tr","td","th","form","label","input","button","select","datalist","optgroup","option","textarea","output","progress","meter","fieldset","legend","details","summary","dialog","script","noscript","template","slot","canvas","applet","acronym","bgsound","dir","frame","frameset","noframes","isindex","keygen","listing","menuitem","nextid","noembed","param","plaintext","rb","rtc","strike","xmp","basefont","big","blink","center","font","marquee","multicol","nobr","spacer","tt"],"mathml":["math","mtext","mi","mn","mo","mspace","ms","mrow","mfrac","msqrt","mroot","mstyle","merror","mpadded","mphantom","msub","msup","msubsup","munder","mover","munderover","mmultiscripts","mprescripts","mtable","mtr","mtd","maction","semantics","annotation","annotation-xml"]};
