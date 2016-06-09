/// <reference path="../../../../shared/client/services/brainAreaService.ts"/>
/// <reference path="../../../../shared/client/services/injectionService.ts"/>
/// <reference path="../../../../shared/client/services/neuronService.ts"/>
/// <reference path="../../../../shared/client/services/sampleService.ts"/>
/// <reference path="../../../../shared/client/services/strainService.ts"/>
/// <reference path="../../../../shared/client/services/structureIdentifierService.ts"/>
/// <reference path="../../../../shared/client/services/tracingNodeService.ts"/>
/// <reference path="../../../../shared/client/services/tracingService.ts"/>
/// <reference path="../../../../shared/client/services/transformService.ts"/>
/// <reference path="../../../../shared/client/services/virusService.ts"/>

class ApiAccessService {
  public static $inject = [
    "$resource",
    "$location",
    "injectionService",
    "registrationTransformService",
    "virusService",
    "strainService",
    "brainAreaService",
    "sampleService",
    "neuronService"
  ];

  public haveService: boolean;
  public serviceUrl: string;
  public serviceDocUrl: string;
  public statusUrl: string;

  private apiLocation: any;

  constructor(private $resource: any, private $location: any, private injectionService: InjectionService,
              private transformService: RegistrationTransformService, private virusService: VirusService,
              private strainService: StrainService, private brainAreaService: BrainAreaService,
              private sampleService: SampleService, private neuronService: NeuronService) {
    this.haveService = false;
    this.serviceUrl = "";
    this.serviceDocUrl = "";
    this.statusUrl = "";

    this.apiLocation = $resource("/service", {});

    this.apiLocation.get((api, headers) => this.update(api));
  }

  private update(api) {
    this.serviceUrl = "http://" + this.$location.host() + ":" + api.service.port + "/" + api.service.api + "/";
    this.serviceDocUrl = "http://" + this.$location.host() + ":" + api.service.port + "/docs";
    this.statusUrl = this.$location.host() + ":" + api.status.port;

    this.haveService = true;

    this.injectionService.setLocation(this.serviceUrl);
    this.transformService.setLocation(this.serviceUrl);
    this.virusService.setLocation(this.serviceUrl);
    this.strainService.setLocation(this.serviceUrl);
    this.brainAreaService.setLocation(this.serviceUrl);
    this.sampleService.setLocation(this.serviceUrl);
    this.neuronService.setLocation(this.serviceUrl);
  }
}

angular.module("sampleManager").service("apiAccessService", ApiAccessService);
