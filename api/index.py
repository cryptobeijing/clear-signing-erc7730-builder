from fastapi import FastAPI, HTTPException

from subprocess import Popen, PIPE
from dotenv import load_dotenv
import os
from erc7730.generate.generate import generate_descriptor
from erc7730.model.input.descriptor import InputERC7730Descriptor
import os
import traceback

from fastapi.responses import JSONResponse
from pydantic import BaseModel

etherscan_api_key = os.getenv("ETHERSCAN_API_KEY")
env = os.environ.copy()
env["ETHERSCAN_API_KEY"] = etherscan_api_key
env["XDG_CACHE_HOME"] = '/tmp'

app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

class Message(BaseModel):
    message: str


@app.get("/api/py/generate", response_model=InputERC7730Descriptor, responses={400: {"model": Message}})
def run_erc7730(address: str, chain_id: int):
    """generate the  'erc7730' based on the contract address"""
    try:
        load_dotenv()

        result = generate_descriptor(
            chain_id=chain_id,
            contract_address=address,
        )
        return result
    except Exception as e:
        error_message = str(e) 

        return JSONResponse(status_code=404, content={"message": error_message})
       

@app.get("/api/py/debug")
def debug_env():
    try:
        load_dotenv()
        address = "0x0bb4d3e88243f4a057db77341e6916b0e449b158"
        etherscan_api_key = os.getenv("ETHERSCAN_API_KEY")
        env = os.environ.copy()
        env["ETHERSCAN_API_KEY"] = etherscan_api_key
        env["XDG_CACHE_HOME"] = '/tmp'

        result = generate_descriptor(
            chain_id=1,
            contract_address=address,
        )
        return {
            "erc7730_path": result,
        }
    except Exception as e:
        tb = traceback.format_exc()
        return {"error": f"{e}: {tb}"}