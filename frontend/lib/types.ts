export interface CostBreakdown {
    label: string;
    share: number;
    amount: string;
}

export interface CostData {
    headline: string;
    unit: string;
    breakdown: CostBreakdown[];
}

export interface Metric {
    label: string;
    typical: string;
    efficient: string;
    chartable: boolean;
}

export interface UtilizationItem {
    label: string;
    provisioned: number;
    used: number;
    unit: string;
}

export interface OperationalImpact {
    infrastructure: string;
    economic: string;
}

export interface IllustrativeFigure {
    title: string;
    percentage: number;
}

export interface TaxonomyLayer {
    id: string;
    name: string;
    term: string;
    translation: string;
    color: string;
    tag: string;
    code: string;
    observed: string;
    cost: CostData;
    rootCauses: string[];
    metrics: Metric[];
    metricsCaption: string;
    signalsIntro: string;
    signals: string[];
    operationalImpact: OperationalImpact;
    relatedTerms: string[];
    version: string;
    permalink: string;
    lastReview: string;
    sourceLabel: string;
    whatYouSee: string;
    whyItHappens: string;
    keyIndicators: string;
    layerRelation: string;
    illustrativeFigure: IllustrativeFigure;
}

export interface MethodologyFramework {
    name: string;
    owner: string;
    description: string;
    layers: { id: string; name: string; scope: string }[];
}

export interface MethodologyMeasurement {
    source: string;
    measures: string;
    layer: string;
}

export interface MethodologyData {
    framework: MethodologyFramework;
    measurement: MethodologyMeasurement[];
    dataSources: string[];
    period: string;
    limitations: string[];
}

export interface CitationsData {
    academic: string;
    journalistic: string;
    attribution: string;
    meta: {
        author: string;
        year: number;
        title: string;
        url: string;
    };
}
