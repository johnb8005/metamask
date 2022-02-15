import { g as getDefaultExportFromCjs, c as createCommonjsModule, a as commonjsGlobal } from '../common/_commonjsHelpers-f5d70792.js';

var dist = createCommonjsModule(function (module, exports) {
var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
var hostDefault = "https://etherscan.finy.ch/api";
var Client = /** @class */ (function () {
    /**
     *
     * @param clientId client id
     * @param addresses crypto addresses (ethereum, solana etc)
     * @param host
     */
    function Client(clientId, addresses, wallet, host) {
        var _this = this;
        if (host === void 0) { host = hostDefault; }
        this.insert = function (payload) { return __awaiter(_this, void 0, void 0, function () {
            var headers, body, method, url, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = { "content-type": "application/json" };
                        body = JSON.stringify(payload);
                        method = "POST";
                        url = this.host + "/analytics/insert";
                        return [4 /*yield*/, fetch(url, {
                                method: method,
                                body: body,
                                headers: headers,
                            })];
                    case 1:
                        r = _a.sent();
                        if (r.status !== 200) {
                            throw Error("something went wrong, could not insert");
                        }
                        return [2 /*return*/, r.json()];
                }
            });
        }); };
        this.host = host;
        this.insert({
            clientId: clientId,
            solana: addresses.solana,
            ethereum: addresses.ethereum,
            wallet: wallet,
        });
    }
    return Client;
}());
exports.Client = Client;
exports.default = Client;
});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(dist);

export default __pika_web_default_export_for_treeshaking__;
