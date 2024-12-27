from fastapi import FastAPI, HTTPException, Path

from subprocess import Popen, PIPE
from dotenv import load_dotenv
import os
from erc7730.generate.generate import generate_descriptor
from erc7730.model.input.descriptor import InputERC7730Descriptor
import os
import traceback
from fastapi.encoders import jsonable_encoder

import json

from fastapi.responses import JSONResponse
from pydantic import BaseModel

etherscan_api_key = os.getenv("ETHERSCAN_API_KEY")
env = os.environ.copy()
env["ETHERSCAN_API_KEY"] = etherscan_api_key
env["XDG_CACHE_HOME"] = '/tmp'


app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

class Message(BaseModel):
    message: str


@app.post("/api/py/generateFromAddress", response_model=InputERC7730Descriptor, responses={400: {"model": Message}})
def run_erc7730(address: str, chain_id: int):
    """generate the  'erc7730' based on the contract address"""
    try:
        etherscan_api_key = os.getenv("ETHERSCAN_API_KEY")
        env = os.environ.copy()
        env["ETHERSCAN_API_KEY"] = etherscan_api_key
        env["XDG_CACHE_HOME"] = '/tmp/.cache'
        load_dotenv()

        result = generate_descriptor(
            chain_id=chain_id,
            contract_address=address,
        )
        return result
    except Exception as e:
        error_message = str(e) 

        return JSONResponse(status_code=404, content={"message": error_message})

class AbiProps(BaseModel):
    abi: str

@app.post("/api/py/generateFromAbi", responses={400: {"model": Message}})
def run_erc7730(params: AbiProps):
    """Generate the 'erc7730' based on an ABI."""
    print('in api', params.abi)
    try:
        return params.abi
        # Decode the ABI string into a dictionary
        abi_dict = json.loads(params.abi)

        # Save the ABI dictionary to a temporary file
        abi_file_path = Path("/tmp/abi.json")
        with abi_file_path.open("w") as abi_file:
            json.dump(abi_dict, abi_file)

        # Use the file path in your function
        result = generate_descriptor(
            abi_file=abi_file_path,
        )
        return result

    except Exception as e:
        error_message = str(e)
        return JSONResponse(status_code=404, content={"message": error_message})