from pydantic  import BaseModel

class ProductCreate (BaseModel) :
    product_name : str
    category : str
    unit_price :float

class ProductUpdate (BaseModel) :
    product_name : str
    category : str
    unit_price :float

class PredictionRequest(BaseModel):
    category : str
    unit_price :float
    quantity : int
    month : int



