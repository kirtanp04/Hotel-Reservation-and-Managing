"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const common_1 = require("../common");
class MongoDB {
}
exports.MongoDB = MongoDB;
_a = MongoDB;
MongoDB.ConnectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    let _userRes = new common_1.UserResponse();
    try {
        yield mongoose_1.default.connect('mongodb+srv://kirtanp04:OyBd0kVg6JZxkvpy@hotelcluster.exs9nof.mongodb.net/Stay_Swift').then(() => {
            _userRes.isError = false;
            _userRes.data = 'Database Connection: Success';
        });
    }
    catch (error) {
        _userRes.Message = (0, common_1.errorPath)('Database/DB.ts', 'ConnectDB', 17) + error;
        _userRes.isError = true;
    }
    finally {
        console.log(_userRes);
    }
});
