interface IAppScope extends ng.IScope {
    service: ApiAccessService;
    injectionService: InjectionService;
    transformService: RegistrationTransformService;
    injectionVirusService: InjectionVirusService;
    brainAreaService: BrainAreaService;
    sampleService: SampleService;
    neuronService: NeuronService;
    mouseStrainService: MouseStrainService;
    fluorophoreService: FluorophoreService;

    apiUrl: string;
    apiDocUrl: string;
}

class AppController {
    public static $inject = [
        "$scope",
        "$resource",
        "toastrConfig",
        "apiAccessService",
        "injectionService",
        "registrationTransformService",
        "injectionVirusService",
        "brainAreaService",
        "sampleService",
        "neuronService",
        "mouseStrainService",
        "fluorophoreService"
    ];

    constructor(private $scope: IAppScope, private $resource: any, protected toastrConfig: any, private serviceApi: ApiAccessService,
                private injectionService: InjectionService, private transformService: RegistrationTransformService,
                private injectionVirusService: InjectionVirusService, private brainAreaService: BrainAreaService,
                private sampleService: SampleService, private neuronService: NeuronService,
                private mouseStrainService: MouseStrainService, private fluorophoreService: FluorophoreService) {

        $scope.service = serviceApi;
        $scope.injectionService = injectionService;
        $scope.transformService = transformService;
        $scope.injectionVirusService = injectionVirusService;
        $scope.brainAreaService = brainAreaService;
        $scope.sampleService = sampleService;
        $scope.neuronService = neuronService;
        $scope.mouseStrainService = mouseStrainService;
        $scope.fluorophoreService = fluorophoreService;

        $scope.$watch("service.serviceUrl", (val) => this.updateService(val));
        $scope.$watch("service.serviceDocUrl", (val) => this.updateServiceDoc(val));

        this.updateService(serviceApi.serviceUrl);
        this.updateServiceDoc(serviceApi.serviceDocUrl);

        this.toastrConfig.positionClass = "toast-bottom-center";
        this.toastrConfig.allowHtml = true;
        this.toastrConfig.timeOut = 2500;
    }

    private updateService(val) {
        this.$scope.apiUrl = val;
    }

    private updateServiceDoc(val) {
        this.$scope.apiDocUrl = val;
    }
}

angular.module("sampleManager").controller("appController", AppController);

